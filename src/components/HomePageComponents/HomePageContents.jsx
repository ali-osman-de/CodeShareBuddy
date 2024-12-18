import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Row, Col } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { db } from "../../../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const HomePageContents = () => {
  const [contents, setContents] = useState([]);
  const navigate = useNavigate();

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
            contentData.createdAt = new Date(contentData.createdAt.seconds * 1000).toLocaleDateString();
          }


          if (contentData.uid) {
            const userDocRef = doc(db, "users", contentData.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
              const userData = userDoc.data();
              contentData.author = userData.fullName || 'Unknown'; 
            }
          }

          fetchedContents.push({ ...contentData, id: contentId });
        }

        setContents(fetchedContents);
      } catch (error) {
        console.error("Error fetching content: ", error);
      }
    };

    fetchContents();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Home</h3>
      </div>

      {contents.map((content) => (
        <Card
          key={content.id}
          className="mb-5 border-1 rounded-4"
          onClick={() => navigate(`/content/${content.id}`)}
        >
          <Row className="d-flex align-items-start">
            <Col md="6">
              <img
                src={content.image || "https://picsum.photos/600/300"}
                alt="Card image"
                className="img-fluid rounded-4 h-100 object-fit-cover"
              />
            </Col>
            <Col md="6">
              <CardBody>
                <CardSubtitle className="mb-2 text-muted fw-light">{content.programmingLanguage || 'Unknown'}</CardSubtitle>
                <CardTitle className="fw-normal" tag="h4">{content.title}</CardTitle>
                <CardText className="text-muted fw-light">{content.description}</CardText>
                <CardText className="text-muted fw-lighter">
                  Created by <span>@{content.author || 'Unknown'}</span> • {content.createdAt || 'N/A'}
                </CardText>
              </CardBody>
            </Col>
          </Row>
        </Card>
      ))}
    </>
  );
};

export default HomePageContents;
