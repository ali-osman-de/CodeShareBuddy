import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import NavigationBar from '../components/NavigationBar'
import Header from '../components/LandingPageComponents/Header'
import WhyCodeShare from '../components/LandingPageComponents/WhyCodeShare'
import FooterSection from '../components/FooterSection'

const LandingPage = () => {
  return (
    <Container>
      <NavigationBar />
      <Row>
        <Col xs="12" className='d-flex justify-content-center'>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col xs="12" className='my-5'>
          <WhyCodeShare />
        </Col>
      </Row>
      <Row>
        <FooterSection />
      </Row>
    </Container>

  )
}

export default LandingPage