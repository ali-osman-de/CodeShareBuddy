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
  Pagination,
  PaginationItem,
  PaginationLink,
  Spinner,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import DeleteSharedCode from "../../utils/DeleteSharedCode.js";

const SharedCodes = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { uid } = useSelector((state) => state.auth);

  const [sharedCodes, setSharedCodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const codesPerPage = 5;

  const handleDelete = async (codeId) => {
    const success = await DeleteSharedCode(codeId);
    if (success) {
      // Update the local state to remove the deleted code
      setSharedCodes((prevCodes) =>
        prevCodes.filter((code) => code.id !== codeId)
      );
    }
  };

  const fetchSharedCodes = async () => {
    try {
      const snippetRef = collection(db, "snippets");
      const q = query(snippetRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      const codes = [];

      querySnapshot.forEach((doc) => {
        codes.push({ ...doc.data(), id: doc.id });
      });

      setSharedCodes(codes);
      setTotalPages(Math.ceil(codes.length / codesPerPage));
    } catch (error) {
      console.error("Error fetching shared codes: ", error);
    } finally {
      setLoading(false); // Loading durdur
    }
  };

  useEffect(() => {
    fetchSharedCodes();
  }, [uid]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentCodes = sharedCodes.slice(
    (currentPage - 1) * codesPerPage,
    currentPage * codesPerPage
  );

  // Eğer yükleme devam ediyorsa Spinner göster
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

  // Eğer hiç kod yoksa mesaj göster
  if (!loading && sharedCodes.length === 0) {
    return (
      <div
        style={{
          height: "50vh",
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <h5 className="text-muted">Hiç kod paylaşımınız yok.</h5>
      </div>
    );
  }

  return (
    <>
      {currentCodes.map((code) => (
        <Card
          style={{
            maxHeight: "300px",
          }}
          key={code.id}
          className="border-0 mt-4"
          //   onClick={() => navigate(`/content/${code.id}`)}
        >
          <Row className="align-items-center">
            <Col xs="7">
              <CardBody>
                <CardSubtitle className="mb-1 text-muted fs-6 fw-light">
                  {code.programmingLanguage}
                </CardSubtitle>
                <CardTitle className="fs-5 fw-semibold">{code.title}</CardTitle>
                <CardText className="text-muted fs-6 fw-light">
                  {code.description}
                </CardText>
                <Button className="bg-light text-dark border-0 fs-6 fw-light rounded-pill">
                  Copy to clipboard
                </Button>
              </CardBody>
            </Col>
            <Col xs="3">
              <img
                alt="Sample"
                style={{
                  height: "200px",
                  objectFit: "100%",
                }}
                src={code.image}
                className="img-fluid rounded-5"
              />
            </Col>
            <Col xs="2">
              <Button
                onClick={() => navigate("/create-new-content", { state: { code } })}
                className="bg-dark text-light border-0 fs-6 fw-light rounded-pill"
              >
                Edit
              </Button>

              <Button
                onClick={() => handleDelete(code.id)}
                className="bg-danger text-light border-0 fs-6 fw-light rounded-pill"
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Card>
      ))}

      {/* Sayfalama Butonları */}
      {sharedCodes.length > codesPerPage && (
        <Pagination>
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink
              previous
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index} active={currentPage === index + 1}>
              <PaginationLink onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem disabled={currentPage === totalPages}>
            <PaginationLink
              next
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </PaginationItem>
        </Pagination>
      )}
    </>
  );
};

export default SharedCodes;
