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
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docRef = doc(db, "snippets", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const snippetData = docSnap.data();
          setContent(snippetData);
          setCode(snippetData.code);

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOutput(code);
    }, 500);

    return () => clearTimeout(timeout);
  }, [code]);

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
          <Card className="border-0">
            <h1 className="fw-light">{content.title}</h1>
            <CardImg
              style={{
                height: "200px",
                width: "200px",
                objectFit: "100%",
                margin: "0 auto"
              }}
              className="rounded-5"
              top
              width="100%"
              src={content.image}
              alt="Card image cap"
            />
            <CardBody>
              <p className="fw-none" style={{ lineHeight: "1.5", letterSpacing: "0.03em", fontSize: "103%", fontFamily: "monospace", fontWeight: "bold", textAlign: "justify" }}>
                {content.description}
              </p>
              <CardBody className="mt-5 bg-secondary" style={{ borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", overflow: "hidden" }}>
                <Editor
                  className="bg-dark"
                  value={code}
                  height="400px"
                  language={content.programmingLanguage.toLowerCase()}
                  defaultValue="// Start writing your code here"
                  onChange={(newValue) => setCode(newValue)}
                  options={{
                    fontSize: 18,
                    minimap: { enabled: false },
                    lineNumbers: "on",
                    theme: "vs-dark",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    wordWrap: "on",
                    cursorStyle: "line",
                    fontFamily: "Fira Code, monospace",
                    fontLigatures: true,
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