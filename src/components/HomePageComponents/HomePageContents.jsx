import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Row,
  Col,
  Spinner,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Importing like icons

const HomePageContents = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedContents, setLikedContents] = useState({});
  const navigate = useNavigate();
  const { uid } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const contentRef = collection(db, "snippets");
        const querySnapshot = await getDocs(contentRef);
        const fetchedContents = [];

        for (const docSnap of querySnapshot.docs) {
          const contentData = docSnap.data();
          const contentId = docSnap.id;

          if (contentData.createdAt && contentData.createdAt.seconds) {
            contentData.createdAt = new Date(
              contentData.createdAt.seconds * 1000
            ).toLocaleDateString();
          }

          if (contentData.uid) {
            const userDocRef = doc(db, "users", contentData.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
              const userData = userDoc.data();
              contentData.author = userData.nickName || "Unknown";
            }
          }

          fetchedContents.push({ ...contentData, id: contentId });
        }

        setContents(fetchedContents);
        const initialLikedContents = {};
        fetchedContents.forEach((content) => {
          initialLikedContents[content.id] =
            content.likes?.includes(uid) || false;
        });
        setLikedContents(initialLikedContents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching content: ", error);
      }
    };

    fetchContents();
  }, [uid]);

  const handleLike = async (contentId) => {
    try {
      const contentRef = doc(db, "snippets", contentId);
      const isLiked = likedContents[contentId];

      if (isLiked) {
        await updateDoc(contentRef, {
          likes: arrayRemove(uid),
        });
      } else {
        await updateDoc(contentRef, {
          likes: arrayUnion(uid),
        });
      }

      setLikedContents((prevState) => ({
        ...prevState,
        [contentId]: !isLiked,
      }));
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          height: "50vh",
        }}
        className="d-flex justify-content-center align-items-center loading-spinner-container"
      >
        <Spinner className="m-5" color="secondary">
          Loading...
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Home</h3>
      </div>

      {contents.map((content) => (
        <Card
          key={content.id}
          className="mb-5 border-1 rounded-4"
          style={{
            maxHeight: "300px",
          }}
          onClick={() => navigate(`/content/${content.id}`)}
        >
          <Row className="d-flex align-items-start">
            <Col md="6">
              <img
                style={{
                  height: "300px",
                  objectFit: "100%",
                }}
                src={content.image || "https://picsum.photos/600/300"}
                alt="Card image"
                className="img-fluid rounded-4 object-fit-cover"
              />
            </Col>
            <Col md="6">
              <CardBody>
                <CardSubtitle className="mb-2 text-muted fw-light">
                  {content.programmingLanguage || "Unknown"}
                </CardSubtitle>
                <CardTitle className="fw-normal" tag="h4">
                  {content.title}
                </CardTitle>
                <CardText
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  className="text-muted fw-light"
                >
                  {content.description}
                </CardText>
                <CardText className="text-muted fw-lighter">
                  Created by <span>@{content.author || "Unknown"}</span> •{" "}
                  {content.createdAt || "N/A"}
                </CardText>
                <Button
                  className={`bg-light border-0 fs-6 fw-light rounded-pill ${
                    likedContents[content.id] ? "text-danger" : "text-dark"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(content.id);
                  }}
                >
                  {likedContents[content.id] ? <FaHeart /> : <FaRegHeart />}{" "}
                  Like
                </Button>
              </CardBody>
            </Col>
          </Row>
        </Card>
      ))}
    </>
  );
};

export default HomePageContents;
