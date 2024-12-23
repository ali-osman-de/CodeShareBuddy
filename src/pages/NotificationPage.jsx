import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import SideMenu from '../components/SideMenu'
import NotificationCard from '../components/NotificationPageComponents/NotificationCard'

const NotificationPage = () => {
  return (
    <Container>
      <Row className='mt-5'>
        <Col xs="3">
          <SideMenu />
        </Col>
        <Col xs="9">
          <NotificationCard />
        </Col>
      </Row>
    </Container>
  )
}

export default NotificationPage