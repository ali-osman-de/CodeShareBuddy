import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import SideMenu from '../components/SideMenu'
import ExplorePageContents from '../components/ExplorePageComponents/ExplorePageContents'

const ExplorePage = () => {
    return (
        <Container>
            <Row className='mt-5'>
                <Col xs="3">
                    <SideMenu />
                </Col>
                <Col xs="9">
                    <ExplorePageContents />
                </Col>
            </Row>
        </Container>
    )
}

export default ExplorePage