import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Container, Row, Col, Card, CardImg, CardBody, Spinner } from "reactstrap";
import { Editor } from "@monaco-editor/react";

const ContentPost = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [author, setAuthor] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, "snippets", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const snippetData = docSnap.data();
          setContent(snippetData);

          if (snippetData.uid) {
            const userDocRef = doc(db, "users", snippetData.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
              setAuthor(userDoc.data());
            }
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  if (loading) {
    return (
      <div style={{ height: "50vh" }} className="d-flex justify-content-center align-items-center">
        <Spinner className="m-5" color="secondary">Loading...</Spinner>
      </div>
    );
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card style={{ maxHeight: "300px" }} className="border-0">
            <h1 className="fw-light">{content.title}</h1>
            <CardImg
              style={{
                height: "600px",
                objectFit: "100%",
              }}
              className="rounded-5"
              top
              width="100%"
              src={content.image}
              alt="Card image cap"
            />
            <CardBody>
              <h4 className="fw-light">{content.description}</h4>
              <CardBody className="mt-5 bg-secondary">
                <Editor
                  className="bg-dark"
                  value={content.code}
                  height="400px"
                  language={content.programmingLanguage.toLowerCase()}
                  defaultValue="// Start writing your code here"
                  options={{
                    fontSize: 18,
                    minimap: { enabled: false },
                  }}
                />
              </CardBody>
            </CardBody>
            <CardBody className="mb-5">
              <div className="d-flex justify-content-between fs-6 fw-normal">
                <small>{formatDate(content.createdAt)}</small> 
                <small>@{author ? author.nickName : "Unknown"}</small> 
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContentPost;
