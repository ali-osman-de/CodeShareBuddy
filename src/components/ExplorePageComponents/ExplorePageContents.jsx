import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase";
import {
  collection,
  query,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Importing like icons

const ExplorePageContents = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [filteredSnippets, setFilteredSnippets] = useState([]);
  const [likedSnippets, setLikedSnippets] = useState({});
  const { uid } = useSelector((state) => state.auth);

  const fetchSnippets = async () => {
    try {
      const snippetRef = collection(db, "snippets");
      const q = query(snippetRef);
      const querySnapshot = await getDocs(q);
      const snippets = [];

      querySnapshot.forEach((doc) => {
        snippets.push({ ...doc.data(), id: doc.id });
      });

      setFilteredSnippets(snippets);
      const initialLikedSnippets = {};
      snippets.forEach((snippet) => {
        initialLikedSnippets[snippet.id] =
          snippet.likes?.includes(uid) || false;
      });
      setLikedSnippets(initialLikedSnippets);
    } catch (error) {
      console.error("Error fetching snippets: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  const handleLike = async (snippetId) => {
    try {
      const snippetRef = doc(db, "snippets", snippetId);
      const isLiked = likedSnippets[snippetId];

      if (isLiked) {
        await updateDoc(snippetRef, {
          likes: arrayRemove(uid),
        });
      } else {
        await updateDoc(snippetRef, {
          likes: arrayUnion(uid),
        });
      }

      setLikedSnippets((prevState) => ({
        ...prevState,
        [snippetId]: !isLiked,
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
      {filteredSnippets.map((snippet) => (
        <Card
          key={snippet.id}
          className="mb-5 border-1 rounded-4"
          style={{
            maxHeight: "300px",
          }}
          onClick={() => navigate(`/content/${snippet.id}`)}
        >
          <Row className="d-flex align-items-start">
            <Col md="6">
              <img
                style={{
                  height: "300px",
                  objectFit: "100%",
                }}
                src={snippet.image || "https://picsum.photos/600/300"}
                alt="Card image"
                className="img-fluid rounded-4 object-fit-cover"
              />
            </Col>
            <Col md="6">
              <CardBody>
                <CardSubtitle className="mb-1 text-muted fs-6 fw-light">
                  {snippet.programmingLanguage}
                </CardSubtitle>
                <CardTitle className="fs-5 fw-semibold">
                  {snippet.title}
                </CardTitle>
                <CardText
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  className="text-muted fs-6 fw-light"
                >
                  {snippet.description}
                </CardText>
                <Button
                  className={`bg-light border-0 fs-6 fw-light rounded-pill ${
                    likedSnippets[snippet.id] ? "text-danger" : "text-dark"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(snippet.id);
                  }}
                >
                  {likedSnippets[snippet.id] ? <FaHeart /> : <FaRegHeart />}{" "}
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

export default ExplorePageContents;
