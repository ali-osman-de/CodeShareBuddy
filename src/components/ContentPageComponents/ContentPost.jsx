import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Container, Row, Col, Card, CardImg, CardBody, CardText } from "reactstrap";
import { Editor } from "@monaco-editor/react";

const ContentPost = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, "snippets", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setContent(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, [id]);

  if (!content) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <Card style={{
            maxHeight: "300px"
          }} className="border-0">
            <h1 className="fw-light">{content.title}</h1>
            <CardImg
              style={{
                height: "600px",
                objectFit: "100%"
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
                  value={content.programmingLanguage}
                  height="200px"
                  language={content.programmingLanguage.toLowerCase()}
                  defaultValue="// Start writing your code here"
                  options={{
                    fontSize: 18,
                    minimap: { enabled: false },
                  }}
                />
              </CardBody>

            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContentPost;
