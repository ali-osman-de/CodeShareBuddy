import React, { useState } from 'react'
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom'

const ExplorePageContents = () => {
    const [hoveredCard, setHoveredCard] = useState(null)
    const navigate = useNavigate()

    return (
        <Row>
            <Col xs="12" className="d-flex justify-content-between align-items-center mb-4">
                <h2>Explore</h2>
                <Input
                    type="search"
                    placeholder="Search..."
                    className="w-25 bg-white text-dark mx-4"
                    style={{
                        borderRadius: '20px',
                        padding: '8px 16px'
                    }}
                />
            </Col>
            <Row className='d-flex justify-content-between'>
                <Col xs="9">
                    <Card className="position-relative h-100"
                        onMouseEnter={() => setHoveredCard(1)}
                        onMouseLeave={() => setHoveredCard(null)}
                        onClick={() => navigate('/content')}>
                        <CardImg
                            top
                            width="100%"
                            src="https://picsum.photos/800/600"
                            alt="Project preview"
                        />
                        <CardBody className={`position-absolute w-100 h-100 top-0 start-0 bg-dark bg-opacity-75 text-white transition-opacity ${hoveredCard === 1 ? 'opacity-100' : 'opacity-0'}`}
                            style={{ transition: 'opacity 0.3s ease' }}>
                            <CardTitle tag="h2">Project Title</CardTitle>
                            <CardSubtitle className="mb-2">
                                Web Development
                            </CardSubtitle>
                            <CardText>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                            </CardText>
                            <div className="d-flex justify-content-between align-items-center">
                                <small>John Doe</small>
                                <small>2 hours ago</small>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="3">
                    <Row className="h-100">
                        <Col xs="12" className="mb-3">
                            <Card className="position-relative"
                                onMouseEnter={() => setHoveredCard(2)}
                                onMouseLeave={() => setHoveredCard(null)}
                                onClick={() => navigate('/content')}>
                                <CardImg
                                    top
                                    width="100%"
                                    src="https://picsum.photos/400/300"
                                    alt="Project preview"
                                />
                                <CardBody className={`position-absolute w-100 h-100 top-0 start-0 bg-dark bg-opacity-75 text-white transition-opacity ${hoveredCard === 2 ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ transition: 'opacity 0.3s ease' }}>
                                    <CardTitle tag="h2">Another Project</CardTitle>
                                    <CardSubtitle className="mb-2">
                                        Mobile App
                                    </CardSubtitle>
                                    <CardText>
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco...
                                    </CardText>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <small>Jane Smith</small>
                                        <small>5 hours ago</small>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs="12" className="mb-3">
                            <Card className="position-relative"
                                onMouseEnter={() => setHoveredCard(3)}
                                onMouseLeave={() => setHoveredCard(null)}
                                onClick={() => navigate('/content')}>
                                <CardImg
                                    top
                                    width="100%"
                                    src="https://picsum.photos/400/300"
                                    alt="Project preview"
                                />
                                <CardBody className={`position-absolute w-100 h-100 top-0 start-0 bg-dark bg-opacity-75 text-white transition-opacity ${hoveredCard === 3 ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ transition: 'opacity 0.3s ease' }}>
                                    <CardTitle tag="h2">Third Project</CardTitle>
                                    <CardSubtitle className="mb-2">
                                        Data Science
                                    </CardSubtitle>
                                    <CardText>
                                        Duis aute irure dolor in reprehenderit in voluptate velit...
                                    </CardText>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <small>Mike Johnson</small>
                                        <small>8 hours ago</small>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xs="12">
                            <Card className="position-relative"
                                onMouseEnter={() => setHoveredCard(4)}
                                onMouseLeave={() => setHoveredCard(null)}
                                onClick={() => navigate('/content')}>
                                <CardImg
                                    top
                                    width="100%"
                                    src="https://picsum.photos/400/300"
                                    alt="Project preview"
                                />
                                <CardBody className={`position-absolute w-100 h-100 top-0 start-0 bg-dark bg-opacity-75 text-white transition-opacity ${hoveredCard === 4 ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ transition: 'opacity 0.3s ease' }}>
                                    <CardTitle tag="h2">Third Project</CardTitle>
                                    <CardSubtitle className="mb-2">
                                        Data Science
                                    </CardSubtitle>
                                    <CardText>
                                        Duis aute irure dolor in reprehenderit in voluptate velit...
                                    </CardText>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <small>Mike Johnson</small>
                                        <small>8 hours ago</small>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* Additional 3 rows of cards */}
            <Row className="mt-4">
                {[5, 6, 7].map((cardId) => (
                    <Col xs="4" key={cardId} className="mb-4">
                        <Card className="position-relative"
                            onMouseEnter={() => setHoveredCard(cardId)}
                            onMouseLeave={() => setHoveredCard(null)}
                            onClick={() => navigate('/content')}>
                            <CardImg
                                top
                                width="100%"
                                src={`https://picsum.photos/400/300?random=${cardId}`}
                                alt="Project preview"
                            />
                            <CardBody className={`position-absolute w-100 h-100 top-0 start-0 bg-dark bg-opacity-75 text-white transition-opacity ${hoveredCard === cardId ? 'opacity-100' : 'opacity-0'}`}
                                style={{ transition: 'opacity 0.3s ease' }}>
                                <CardTitle tag="h2">Project {cardId}</CardTitle>
                                <CardSubtitle className="mb-2">
                                    Category {cardId}
                                </CardSubtitle>
                                <CardText>
                                    Project description for card {cardId}...
                                </CardText>
                                <div className="d-flex justify-content-between align-items-center">
                                    <small>User {cardId}</small>
                                    <small>{cardId} hours ago</small>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row>
                {[8, 9, 10].map((cardId) => (
                    <Col xs="4" key={cardId} className="mb-4">
                        <Card className="position-relative"
                            onMouseEnter={() => setHoveredCard(cardId)}
                            onMouseLeave={() => setHoveredCard(null)}
                            onClick={() => navigate('/content')}>
                            <CardImg
                                top
                                width="100%"
                                src={`https://picsum.photos/400/300?random=${cardId}`}
                                alt="Project preview"
                            />
                            <CardBody className={`position-absolute w-100 h-100 top-0 start-0 bg-dark bg-opacity-75 text-white transition-opacity ${hoveredCard === cardId ? 'opacity-100' : 'opacity-0'}`}
                                style={{ transition: 'opacity 0.3s ease' }}>
                                <CardTitle tag="h2">Project {cardId}</CardTitle>
                                <CardSubtitle className="mb-2">
                                    Category {cardId}
                                </CardSubtitle>
                                <CardText>
                                    Project description for card {cardId}...
                                </CardText>
                                <div className="d-flex justify-content-between align-items-center">
                                    <small>User {cardId}</small>
                                    <small>{cardId} hours ago</small>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row>
                {[11, 12, 13].map((cardId) => (
                    <Col xs="4" key={cardId} className="mb-4">
                        <Card className="position-relative"
                            onMouseEnter={() => setHoveredCard(cardId)}
                            onMouseLeave={() => setHoveredCard(null)}
                            onClick={() => navigate('/content')}>
                            <CardImg
                                top
                                width="100%"
                                src={`https://picsum.photos/400/300?random=${cardId}`}
                                alt="Project preview"
                            />
                            <CardBody className={`position-absolute w-100 h-100 top-0 start-0 bg-dark bg-opacity-75 text-white transition-opacity ${hoveredCard === cardId ? 'opacity-100' : 'opacity-0'}`}
                                style={{ transition: 'opacity 0.3s ease' }}>
                                <CardTitle tag="h2">Project {cardId}</CardTitle>
                                <CardSubtitle className="mb-2">
                                    Category {cardId}
                                </CardSubtitle>
                                <CardText>
                                    Project description for card {cardId}...
                                </CardText>
                                <div className="d-flex justify-content-between align-items-center">
                                    <small>User {cardId}</small>
                                    <small>{cardId} hours ago</small>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Row>
    )
}

export default ExplorePageContents