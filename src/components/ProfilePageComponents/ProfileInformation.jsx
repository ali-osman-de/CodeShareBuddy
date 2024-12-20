import React, { useState, useEffect } from 'react';
import { Card, CardBody, Form, FormGroup, Label, Input, Row, Col, Button, Toast, ToastHeader, ToastBody } from 'reactstrap';
import { useSelector } from 'react-redux';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const ProfileInformation = () => {
    const { displayName, uid } = useSelector((state) => state.auth);

    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    const [nickName, setNickName] = useState('');
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');

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
                    setNickName(userData.nickName || '');
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
        if (fullName && age && nickName) {
            try {
                const userRef = doc(db, 'users', uid);
                const userDoc = await getDoc(userRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();

                    if (
                        userData.fullName === fullName &&
                        userData.age === age &&
                        userData.nickName === nickName
                    ) {
                        setToastType('info'); // Info tipindeki toast
                        setToastMessage('Bilgileriniz zaten güncel.');
                        setToastVisible(true);

                        setTimeout(() => setToastVisible(false), 3000);
                        return; // İşlem burada sonlandırılır
                    }
                }

                await setDoc(userRef, {
                    fullName: fullName,
                    age: age,
                    nickName: nickName,
                }, { merge: true });

                setToastType('success');
                setToastMessage('Bilgiler başarıyla kaydedildi.');
                setToastVisible(true);

                setTimeout(() => setToastVisible(false), 3000);
            } catch (error) {
                console.error('Hata oluştu:', error);

                setToastType('error');
                setToastMessage('Bilgiler kaydedilirken hata oluştu.');
                setToastVisible(true);

                setTimeout(() => setToastVisible(false), 3000);
            }
        } else {
            setToastType('warning');
            setToastMessage('Lütfen tüm alanları doldurunuz.');
            setToastVisible(true);

            setTimeout(() => setToastVisible(false), 3000);
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
                                        id="nickName"
                                        name="nickName"
                                        type="text"
                                        placeholder="nickName"
                                        value={nickName}
                                        onChange={(e) => setNickName(e.target.value)}
                                        className="bg-light border-0"
                                    />
                                    <Label for="Nickname">Nickname</Label>
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

            {toastVisible && (
                <div
                    className="position-fixed bottom-0 end-0 p-3"
                    style={{ zIndex: 1050 }}
                >
                    <Toast>
                        <ToastHeader icon={
                            toastType === 'success' ? 'success' :
                                toastType === 'error' ? 'danger' :
                                    toastType === 'warning' ? 'warning' :
                                        'info'
                        }>
                            {toastType === 'success' ? 'Başarılı' :
                                toastType === 'error' ? 'Hata' :
                                    toastType === 'warning' ? 'Uyarı' :
                                        'Bilgi'}
                        </ToastHeader>
                        <ToastBody>
                            {toastMessage}
                        </ToastBody>
                    </Toast>
                </div>
            )}

        </div>
    );
};

export default ProfileInformation;
