import React from 'react'
import { Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'

const ContentPost = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Card className='border-0'>
                        <h1 className='fw-light'>Blog Title</h1>
                        <CardImg className='rounded-5' top width="100%" src="https://picsum.photos/1600/800" alt="Card image cap" />
                        <CardBody>
                            <h4 className='fw-light'>Blog Subtitle</h4>
                            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className='border-0 mt-5'>
                        <CardTitle>
                            <h6 className='fw-light'>Comments</h6>
                        </CardTitle>
                        <CardBody className='d-flex flex-column justify-content-center shadow-lg rounded-5'>
                            <h6 className='fw-light'>@AliOsmanDemirkollu</h6>
                            <p className='fw-lighter mx-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit saepe consequatur molestiae libero tempora quidem magni nam nisi rem ab?</p>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default ContentPost