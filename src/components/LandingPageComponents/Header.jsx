import React from "react";
import illustration from "../../assets/illustration.jpg"; // Import the local image
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
          className="cardImage"
          style={{
            width: 1000,
            height: 600,
          }}
        />
        <CardImgOverlay className="formCoordinats">
          <Form>
            <Row className="row-cols-lg-auto g-3 align-items-center ">
              <Col>
                <Label className="visually-hidden" for="exampleEmail">
                  Email
                </Label>
                <Input
                  style={{ boxShadow: "none", border: "none" }}
                  id="exampleEmail"
                  name="email"
                  placeholder="something@idk.cool"
                  type="email"
                />
              </Col>
              <Col>
                <Button color="primary">Submit</Button>
              </Col>
            </Row>
          </Form>
        </CardImgOverlay>
      </Card>
    </div>
  );
};

export default Header;
