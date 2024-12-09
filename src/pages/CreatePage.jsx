import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import SideMenu from '../components/SideMenu'

const CreatePage = () => {
    return (
        <Container>
            <Row className='mt-5'>
                <Col xs="3">
                    <SideMenu />
                </Col>
                <Col xs="9">
                
                </Col>
            </Row>
        </Container>
    )
}

export default CreatePage