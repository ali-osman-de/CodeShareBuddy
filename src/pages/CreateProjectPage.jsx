import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import SideMenu from '../components/SideMenu'
import CreatePage from '../components/CreatePageComponents/CreatePage'

const CreateProjectPage = () => {
  return (
    <Container>
      <Row className='mt-5'>
        <Col xs="3">
          <SideMenu />
        </Col>
        <Col xs="9">
          <CreatePage />
        </Col>
      </Row>
    </Container>
  )
}

export default CreateProjectPage