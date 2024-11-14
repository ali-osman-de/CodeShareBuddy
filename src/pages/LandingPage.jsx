import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import NavigationBar from '../components/NavigationBar'
import Header from '../components/LandingPageComponents/Header'
import WhyCodeShare from '../components/LandingPageComponents/WhyCodeShare'
import Statistics from '../components/LandingPageComponents/Statistics'

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
        <Col xs="12" >
          <Statistics />
        </Col>
      </Row>
    </Container>

  )
}

export default LandingPage