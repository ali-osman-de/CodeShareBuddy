import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Row, Col, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";

const SharedCodes = () => {
    const navigate = useNavigate();

    const { uid } = useSelector((state) => state.auth);


    const [sharedCodes, setSharedCodes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const codesPerPage = 5;


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

    return (
        <>
            {currentCodes.map((code) => (
                <Card key={code.id} className="border-0 mt-4" onClick={() => navigate(`/content/${code.id}`)}>
                    <Row className="align-items-center">
                        <Col xs="8">
                            <CardBody>
                                <CardSubtitle className="mb-1 text-muted fs-6 fw-light">
                                    {code.programmingLanguage}
                                </CardSubtitle>
                                <CardTitle className="fs-5 fw-semibold">{code.title}</CardTitle>
                                <CardText className="text-muted fs-6 fw-light">{code.description}</CardText>
                                <Button className="bg-light text-dark border-0 fs-6 fw-light rounded-pill">
                                    Copy to clipboard
                                </Button>
                            </CardBody>
                        </Col>
                        <Col xs="4">
                            <img alt="Sample" src={code.image} className="img-fluid rounded-5" />
                        </Col>
                    </Row>
                </Card>
            ))}

            {/* Sayfalama Butonları */}
            {sharedCodes.length > codesPerPage && (
                <Pagination>
                    <PaginationItem disabled={currentPage === 1}>
                        <PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index} active={currentPage === index + 1}>
                            <PaginationLink onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem disabled={currentPage === totalPages}>
                        <PaginationLink next onClick={() => handlePageChange(currentPage + 1)} />
                    </PaginationItem>
                </Pagination>
            )}
        </>
    );
};

export default SharedCodes;
