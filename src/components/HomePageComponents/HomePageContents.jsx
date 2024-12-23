import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Row, Col, Spinner, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../../../firebase";
import { collection, getDocs, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';

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


        const user = auth.currentUser;
        if (user) {
          const likedContentsMap = {};
          for (const content of fetchedContents) {
            const postRef = doc(db, "snippets", content.id);
            const postDoc = await getDoc(postRef);
            const postData = postDoc.data();

            if (postData.likes && postData.likes.includes(user.uid)) {
              likedContentsMap[content.id] = true;
            } else {
              likedContentsMap[content.id] = false;
            }
          }
          setLikedContents(likedContentsMap);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching content: ", error);
      }
    };

    fetchContents();
  }, [uid]);


  const handleLike = async (contentId) => {
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;
      const contentRef = doc(db, "snippets", contentId);

      try {
        const contentDoc = await getDoc(contentRef);
        const contentData = contentDoc.data();

        if (contentData.likes && contentData.likes.includes(userId)) {
          // If the user already liked it, remove the like
          await updateDoc(contentRef, {
            likes: arrayRemove(userId),
          });
          setLikedContents((prev) => ({
            ...prev,
            [contentId]: false,
          }));
        } else {
          // If the user hasn't liked it, add the like
          await updateDoc(contentRef, {
            likes: arrayUnion(userId),
          });
          setLikedContents((prev) => ({
            ...prev,
            [contentId]: true,
          }));
        }
      } catch (error) {
        console.error("Failed to update like status: ", error);
      }
    } else {
      console.log("Please log in.");
    }
  };

  if (loading) {
    return (

      <div style={{ height: "50vh" }} className="d-flex justify-content-center align-items-center loading-spinner-container">
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
                <CardSubtitle className="mb-2 text-muted fw-light">{content.programmingLanguage || 'Unknown'}</CardSubtitle>
                <CardTitle className="fw-normal" tag="h4">{content.title}</CardTitle>
                <CardText
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',

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
                  className={`bg-light border-0 fs-6 fw-light rounded-pill ${likedContents[content.id] ? 'text-danger' : 'text-dark'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(content.id);
                  }}
                >
                  {likedContents[content.id] ? <FaHeart /> : <FaRegHeart />} Like
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
