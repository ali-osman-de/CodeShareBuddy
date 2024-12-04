import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import ProfileHeader from '../components/ProfilePageComponents/ProfileHeader'
import ProfileSideMenu from '../components/ProfilePageComponents/ProfileSideMenu'

const ProfilePage = () => {
  return (
    <Container>
      <Row className='mt-5'>
        <Col xs="3">
          <ProfileSideMenu />
        </Col>
        <Col xs="9">
          <ProfileHeader />
        </Col>
      </Row>
    </Container>
  )
}

export default ProfilePage