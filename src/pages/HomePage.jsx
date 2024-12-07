import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import SideMenu from '../components/SideMenu'
import HomePageContents from '../components/HomePageComponents/HomePageContents'

const HomePage = () => {
  return (
    <Container>
      <Row className='mt-5'>
        <Col xs="3">
          <SideMenu />
        </Col>
        <Col xs="9">
          <Row>
            <Col xs="12">
              <HomePageContents />
            </Col>
          </Row>
        </Col>
      </Row>

    </Container>
  )
}

export default HomePage