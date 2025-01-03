import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import NavigationBar from '../components/NavigationBar'
import Header from '../components/LandingPageComponents/Header'
import WhyCodeShare from '../components/LandingPageComponents/WhyCodeShare'
import Statistics from '../components/LandingPageComponents/Statistics'
import FeaturedProject from '../components/LandingPageComponents/FeaturedProject'
import FooterSection from "../components/FooterSection"

const LandingPage = () => {
  return (
    <Container>
      <NavigationBar />
      <Row className='mt-3'>
        <Col xs="12" className='d-flex justify-content-center'>
          <Header />
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col xs="12" className='my-5'>
          <WhyCodeShare />
        </Col>
      </Row>
      <Row>
        <Col xs="12" >
          <FeaturedProject />

        </Col>
      </Row>
      <Row>
        <Col xs="12" >
          <Statistics />
        </Col>
      </Row>
      <FooterSection />
    </Container>

  )
}

export default LandingPage