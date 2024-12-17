import React, { useState, useEffect } from 'react';
import { Card, CardBody, Form, FormGroup, Label, Input, Row, Col, Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const ProfileInformation = () => {
    const { displayName, uid } = useSelector((state) => state.auth);

    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (!uid) return;

            try {
                const userRef = doc(db, 'users', uid);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setFullName(userData.fullName || displayName || '');
                    setAge(userData.age || '');
                    setCity(userData.city || '');
                } else {
                    console.log('Kullanıcı verisi bulunamadı.');
                    setFullName(displayName || ''); 
                }
            } catch (error) {
                console.error('Veri çekilirken hata oluştu:', error);
            }
        };

        fetchUserData();
    }, [uid, displayName]);

    const handleSave = async () => {
        if (fullName && age && city) {
            try {
                const userRef = doc(db, 'users', uid);
                await setDoc(userRef, {
                    fullName: fullName,
                    age: age,
                    city: city,
                }, { merge: true });

                alert('Bilgiler başarıyla kaydedildi.');
            } catch (error) {
                console.error('Hata oluştu:', error);
                alert('Bilgiler kaydedilirken hata oluştu.');
            }
        } else {
            alert('Lütfen tüm alanları doldurunuz.');
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <Card className="rounded-3 border-0" style={{ maxWidth: '600px', width: '100%' }}>
                <CardBody className="p-4">
                    <Form>
                        <Row>
                            <Col md={12}>
                                <FormGroup floating>
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        placeholder="Adınızı giriniz"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="bg-light border-0"
                                    />
                                    <Label for="fullName">Ad Soyad</Label>
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
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
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
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className="bg-light border-0"
                                    />
                                    <Label for="city">Şehir</Label>
                                </FormGroup>
                            </Col>
                        </Row>

                        <div className="d-flex justify-content-end mt-4">
                            <Button
                                className="bg-dark text-white border-0 fs-6 fw-light"
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
};

export default ProfileInformation;
