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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import DeleteSharedCode from "../../utils/DeleteSharedCode.js";
import { FaBars } from "react-icons/fa"; // Importing an icon from react-icons

const SharedCodes = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { uid } = useSelector((state) => state.auth);

  const [sharedCodes, setSharedCodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState({});

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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert("Copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const toggleDropdown = (id) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

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
          onClick={() => navigate(`/content/${code.id}`)}
        >
          <Row className="align-items-center">
            <Col xs="8">
              <CardBody>
                <CardSubtitle className="mb-1 text-muted fs-6 fw-light">
                  {code.programmingLanguage}
                </CardSubtitle>
                <CardTitle className="fs-5 fw-semibold">{code.title}</CardTitle>
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
                  {code.description}
                </CardText>
                <Button
                  className="bg-light text-dark border-0 fs-6 fw-light rounded-pill"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(code.code);
                  }}
                >
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
            <Col
              xs="1"
              className="d-flex justify-content-end align-items-start"
              style={{ alignSelf: "flex-start" }}
            >
              <Dropdown
                isOpen={dropdownOpen[code.id]}
                toggle={(e) => {
                  e.stopPropagation();
                  toggleDropdown(code.id);
                }}
              >
                <DropdownToggle
                  className="bg-transparent border-0 p-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaBars color="black" size={24} />
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/create-new-content", {
                        state: { code, isEdit: true },
                      });
                    }}
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(code.id);
                    }}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
        </Card>
      ))}
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
