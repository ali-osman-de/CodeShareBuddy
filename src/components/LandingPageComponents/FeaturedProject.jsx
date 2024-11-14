import React from 'react'
import { Card, CardBody, CardLink, CardSubtitle, CardText, CardTitle } from 'reactstrap'

const FeaturedProject = () => {
    return (
        <div className='mx-5 my-3'>
            <h1 className='fw-bold fs-4 mt-3 mb-3 '>Featured Projects</h1>
            <div className='d-flex justify-content-between'>
                <div>
                    <img
                        style={{ width: "18rem" }}
                        className='rounded-5 shadow my-3'
                        alt="Card cap"
                        src="https://picsum.photos/318/181"
                        width="100%"
                    />
                    <Card
                        className='rounded-4 shadow'
                        style={{
                            width: '18rem',
                            border: "none"
                        }}
                    >
                        <CardBody>
                            <CardTitle tag={"h5"} className='fw-semibold'>
                                Reinforcement Learning Hands-On Workshop
                            </CardTitle>
                            <CardText style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                width: '100%'
                            }}>
                                Some quick example text to build on the card title and make up the bulk of the card‘s content.
                            </CardText>
                            <div className='d-flex justify-content-evenly align-items-start'>
                                <CardLink className='text-secondary fs-6 fw-light' style={{ textDecorationLine: "none" }} href="#">
                                    @JimmyForEveryThing
                                </CardLink>
                                <p className='fs-6 fw-light text-secondary'>-</p>
                                <p className='fs-6 fw-light text-secondary'>6h</p>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div>
                    <img
                        style={{ width: "18rem" }}
                        className='rounded-5 shadow my-3'
                        alt="Card cap"
                        src="https://picsum.photos/318/185"
                        width="100%"
                    />
                    <Card
                        className='rounded-4 shadow'
                        style={{
                            width: '18rem',
                            border: "none"
                        }}
                    >
                        <CardBody>
                            <CardTitle tag={"h5"} className='fw-semibold'>
                                Reinforcement Learning Hands-On Workshop
                            </CardTitle>
                            <CardText style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                width: '100%'
                            }}>
                                Some quick example text to build on the card title and make up the bulk of the card‘s content.
                            </CardText>
                            <div className='d-flex justify-content-evenly align-items-start'>
                                <CardLink className='text-secondary fs-6 fw-light' style={{ textDecorationLine: "none" }} href="#">
                                    @JimmyForEveryThing
                                </CardLink>
                                <p className='fs-6 fw-light text-secondary'>-</p>
                                <p className='fs-6 fw-light text-secondary'>6h</p>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div>
                    <img
                        style={{ width: "18rem" }}
                        className='rounded-5 shadow my-3'
                        alt="Card cap"
                        src="https://picsum.photos/318/184"
                        width="100%"
                    />
                    <Card
                        className='rounded-4 shadow'
                        style={{
                            width: '18rem',
                            border: "none"
                        }}
                    >
                        <CardBody>
                            <CardTitle tag={"h5"} className='fw-semibold'>
                                Reinforcement Learning Hands-On Workshop
                            </CardTitle>
                            <CardText style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                width: '100%'
                            }}>
                                Some quick example text to build on the card title and make up the bulk of the card‘s content.
                            </CardText>
                            <div className='d-flex justify-content-evenly align-items-start'>
                                <CardLink className='text-secondary fs-6 fw-light' style={{ textDecorationLine: "none" }} href="#">
                                    @JimmyForEveryThing
                                </CardLink>
                                <p className='fs-6 fw-light text-secondary'>-</p>
                                <p className='fs-6 fw-light text-secondary'>6h</p>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div>
                    <img
                        style={{ width: "18rem" }}
                        className='rounded-5 shadow my-3'
                        alt="Card cap"
                        src="https://picsum.photos/318/182"
                        width="100%"
                    />
                    <Card
                        className='rounded-4 shadow'
                        style={{
                            width: '18rem',
                            border: "none"
                        }}
                    >
                        <CardBody>
                            <CardTitle tag={"h5"} className='fw-semibold'>
                                Reinforcement Learning Hands-On Workshop
                            </CardTitle>
                            <CardText style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                width: '100%'
                            }}>
                                Some quick example text to build on the card title and make up the bulk of the card‘s content.
                            </CardText>
                            <div className='d-flex justify-content-evenly align-items-start'>
                                <CardLink className='text-secondary fs-6 fw-light' style={{ textDecorationLine: "none" }} href="#">
                                    @JimmyForEveryThing
                                </CardLink>
                                <p className='fs-6 fw-light text-secondary'>-</p>
                                <p className='fs-6 fw-light text-secondary'>6h</p>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default FeaturedProject