import React from 'react'
import { Card, CardBody, Form, FormGroup, Label, Input, Row, Col, Button } from 'reactstrap'

const ProfileInformation = () => {
    return (
        <div className="d-flex justify-content-center">
            <Card className="rounded-3 border-0" style={{ maxWidth: '600px', width: '100%' }}>
                <CardBody className="p-4">
                    <Form>
                        <Row>
                            <Col md={12}>
                                <FormGroup floating>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder="İsminizi giriniz"
                                        className="bg-light border-0"
                                    />
                                    <Label for="firstName">İsim</Label>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            <Col md={12}>
                                <FormGroup floating>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder="Soyisminizi giriniz"
                                        className="bg-light border-0"
                                    />
                                    <Label for="lastName">Soyisim</Label>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            <Col md={12}>
                                <FormGroup floating>
                                    <Input
                                        id="age"
                                        name="age"
                                        type="number"
                                        placeholder="Yaşınızı giriniz"
                                        className="bg-light border-0"
                                    />
                                    <Label for="age">Yaş</Label>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            <Col md={12}>
                                <FormGroup floating>
                                    <Input
                                        id="city"
                                        name="city"
                                        type="text"
                                        placeholder="Şehrinizi giriniz"
                                        className="bg-light border-0"
                                    />
                                    <Label for="city">Şehir</Label>
                                </FormGroup>
                            </Col>
                        </Row>

                        <div className="d-flex justify-content-end mt-4">
                            <Button className='bg-dark text-white border-0 fs-6 fw-light'>Save</Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default ProfileInformation