import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { FaSquareXTwitter, FaInstagram, FaFacebook } from "react-icons/fa6";


const FooterSection = () => {
    return (
        <footer className=" my-4 mx-5">
            <Container>
                <Row>
                    {/* Harita kısmı */}
                    <Col xs={4} className="mb-3">
                        <div style={{ width: "100%" }}>
                            <iframe
                                width="100%"
                                height="300"
                                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Y%C4%B1ld%C4%B1z%20Teknopark,%20Y%C4%B1ld%C4%B1z%20Teknik%20%C3%9Cniversitesi,%20Davutpa%C5%9Fa%20Kamp%C3%BCs%C3%BC,%2034220%20Esenler/%C4%B0stanbul+(CodeShareBuddy)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                            </iframe>
                        </div>
                    </Col>

                    {/* Footer kısmı */}
                    <Col sm={8} className="d-flex flex-column align-items-center justify-content-center">
                        <h3 className='fw-light'>Hakkımızda</h3>
                        <ul className="nav justify-content-center pb-3 mb-3">
                            <li className="nav-item"><a href="#" className="fw-light nav-link px-2 text-body-secondary">Home</a></li>
                            <li className="nav-item"><a href="#" className="fw-light nav-link px-2 text-body-secondary">Features</a></li>
                            <li className="nav-item"><a href="#" className="fw-light nav-link px-2 text-body-secondary">Pricing</a></li>
                            <li className="nav-item"><a href="#" className="fw-light nav-link px-2 text-body-secondary">FAQs</a></li>
                            <li className="nav-item"><a href="#" className="fw-light nav-link px-2 text-body-secondary">About</a></li>
                        </ul>
                    </Col>
                </Row>

                <Row>
                    <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                        <p>© 2024 Company, Inc. All rights reserved.</p>
                        <ul className="list-unstyled d-flex">
                            <li className="ms-3">
                                <a className="link-body-emphasis" href="#">
                                    <FaSquareXTwitter size={24} />
                                </a>
                            </li>
                            <li className="ms-3">
                                <a className="link-body-emphasis" href="#">
                                    <FaInstagram size={24} />
                                </a>
                            </li>
                            <li className="ms-3">
                                <a className="link-body-emphasis" href="#">
                                    <FaFacebook size={24} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </Row>
            </Container>
        </footer>
    );
};

export default FooterSection;
