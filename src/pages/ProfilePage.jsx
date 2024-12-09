import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import ProfileHeader from '../components/ProfilePageComponents/ProfileHeader'
import SideMenu from '../components/SideMenu'
import ProfileContents from '../components/ProfilePageComponents/ProfileContents'

const ProfilePage = () => {
  return (
    <Container>
      <Row className='mt-5'>
        <Col xs="3">
          <SideMenu />
        </Col>
        <Col xs="9">
          <ProfileHeader />
          <Row>
            <Col xs="12">
              <ProfileContents />
            </Col>
          </Row>
        </Col>
      </Row>

    </Container>
  )
}

export default ProfilePage