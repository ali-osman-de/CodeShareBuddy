import React from 'react'
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Row, Col, Button } from 'reactstrap'

const HomePageContents = () => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Home</h3>
      </div>
      <Card className="mb-5 border-0">
        <Row className="d-flex align-items-start">
          <Col md="6">
            <img
              src="https://picsum.photos/600/300"
              alt="Card image"
              className="img-fluid rounded-4 h-100 object-fit-cover"
            />
          </Col>
          <Col md="6">
            <CardBody>
              <CardSubtitle className="mb-2 text-muted fw-light">Python</CardSubtitle>
              <CardTitle className='fw-normal' tag="h4">Generate music using AI</CardTitle>
              <CardText className='text-muted fw-light'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste, saepe.
              </CardText>
              <CardText className='text-muted fw-lighter'>
                Created by <span>@Julie</span> • 2 days ago
              </CardText>
            </CardBody>
          </Col>
        </Row>
      </Card>
      <Card className="mb-5 border-0">
        <Row className="d-flex align-items-start">
          <Col md="6">
            <img
              src="https://picsum.photos/600/300"
              alt="Card image"
              className="img-fluid rounded-4 h-100 object-fit-cover"
            />
          </Col>
          <Col md="6">
            <CardBody>
              <CardSubtitle className="mb-2 text-muted fw-light">Python</CardSubtitle>
              <CardTitle className='fw-normal' tag="h4">Generate music using AI</CardTitle>
              <CardText className='text-muted fw-light'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste, saepe.
              </CardText>
              <CardText className='text-muted fw-lighter'>
                Created by <span>@Julie</span> • 2 days ago
              </CardText>
            </CardBody>
          </Col>
        </Row>
      </Card>
      <Card className="mb-5 border-0">
        <Row className="d-flex align-items-start">
          <Col md="6">
            <img
              src="https://picsum.photos/600/300"
              alt="Card image"
              className="img-fluid rounded-4 h-100 object-fit-cover"
            />
          </Col>
          <Col md="6">
            <CardBody>
              <CardSubtitle className="mb-2 text-muted fw-light">Python</CardSubtitle>
              <CardTitle className='fw-normal' tag="h4">Generate music using AI</CardTitle>
              <CardText className='text-muted fw-light'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste, saepe.
              </CardText>
              <CardText className='text-muted fw-lighter'>
                Created by <span>@Julie</span> • 2 days ago
              </CardText>
            </CardBody>
          </Col>
        </Row>
      </Card>
      <Card className="mb-5 border-0">
        <Row className="d-flex align-items-start">
          <Col md="6">
            <img
              src="https://picsum.photos/600/300"
              alt="Card image"
              className="img-fluid rounded-4 h-100 object-fit-cover"
            />
          </Col>
          <Col md="6">
            <CardBody>
              <CardSubtitle className="mb-2 text-muted fw-light">Python</CardSubtitle>
              <CardTitle className='fw-normal' tag="h4">Generate music using AI</CardTitle>
              <CardText className='text-muted fw-light'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste, saepe.
              </CardText>
              <CardText className='text-muted fw-lighter'>
                Created by <span>@Julie</span> • 2 days ago
              </CardText>
            </CardBody>
          </Col>
        </Row>
      </Card>
    </>
  )
}

export default HomePageContents