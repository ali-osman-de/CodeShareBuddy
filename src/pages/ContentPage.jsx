import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import SideMenu from '../components/SideMenu'
import ContentPost from '../components/ContentPageComponents/ContentPost'

const ContentPage = () => {
    return (
        <Container>
            <Row className='mt-5'>
                <Col xs="3">
                    <SideMenu />
                </Col>
                <Col xs="9">
                    <ContentPost />
                </Col>
            </Row>

        </Container>
    )
}

export default ContentPage