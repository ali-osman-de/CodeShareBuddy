import React from "react";
import illustration from "../../assets/bg-ground.jpeg"; 
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

const Header = () => {
  return (
    <div className="mx-5">
      <Card inverse style={{ border: "none", height: "500px" }}>
        <CardImg
          alt="Card image cap"
          src={illustration}
          className="cardImage rounded-5"
          style={{
            width: 1000,
            height: 600,
          }}
        />
        <CardImgOverlay className="formCoordinats">
          <Form className="p-3 rounded-4 shadow-lg" style={{ backgroundColor: "#e0afa0" }}>
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
                <Button className="px-3" style={{ backgroundColor: "#f9f7f3", border: "none", color:"#0b090a" }}>Register!</Button>
              </Col>
            </Row>
          </Form>
        </CardImgOverlay>
      </Card>
    </div>
  );
};

export default Header;
