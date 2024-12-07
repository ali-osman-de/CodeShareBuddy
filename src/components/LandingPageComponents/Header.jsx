import React from "react";
import illustration from "../../assets/illustration.png";
import {
  Button,
  Card,
  CardImg,
  CardImgOverlay,
  Col,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import "./Header.css";
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  return (
    <div className="mx-5">
      <Card inverse style={{ border: "none", height: "500px" }}>
        <CardImg
          alt="Card image cap"
          src={illustration}
          className="cardImage"
          style={{
            width: 1000,
            height: 600,
          }}
        />
        <CardImgOverlay className="formCoordinats">
          <Form className="p-3 rounded-4 shadow-lg" style={{ backgroundColor: "#edf6f9" }}>
            <Row className="row-cols-lg-auto g-3 align-items-center">
              <Col>
                <Label className="visually-hidden" for="exampleEmail">
                  Email
                </Label>
                <Input
                  style={{ boxShadow: "none", border: "none" }}
                  id="exampleEmail"
                  name="email"
                  placeholder="example@gmail.com"
                  type="email"
                />
              </Col>
              <Col>
                <Button
                  className="px-3"
                  style={{ backgroundColor: "#3a86ff", border: "none" }}
                  onClick={() => navigate('/sign-in', { state: { isSignUp: true } })}
                >Register!</Button>
              </Col>
            </Row>
          </Form>
        </CardImgOverlay>
      </Card>
    </div>
  );
};

export default Header;
