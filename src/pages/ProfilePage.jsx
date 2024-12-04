import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import ProfileHeader from '../components/ProfilePageComponents/ProfileHeader'
const ProfilePage = () => {
  return (
    <Container>
      <Row>
        <Col xs="4">

        </Col>
        <Col xs="8">
          <ProfileHeader />
        </Col>
      </Row>
    </Container>
  )
}

export default ProfilePage