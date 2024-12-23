import React, { useEffect, useState } from "react";
import { Card, CardBody, Row, Col, Spinner } from "reactstrap";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import Cookies from "js-cookie";

const NotificationCard = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const authState = Cookies.get("authState");
                if (!authState) {
                    console.error("Kullanıcı oturumu yok!");
                    setLoading(false);
                    return;
                }

                const { uid: currentUserUid } = JSON.parse(authState);

                if (!currentUserUid) {
                    console.error("UID bulunamadı!");
                    setLoading(false);
                    return;
                }

                const snippetsRef = collection(db, "snippets");
                const q = query(snippetsRef, where("uid", "==", currentUserUid));
                const querySnapshot = await getDocs(q);

                const fetchedNotifications = [];

                for (const doc of querySnapshot.docs) {
                    const data = doc.data();
                    console.log(data);

                    if (data.likes && data.likes.length > 0) {
                        for (const likerUid of data.likes) {

                            // Eğer likerUid ile currentUserUid aynıysa, bu bildirimi geç
                            if (likerUid === currentUserUid) {
                                continue; // Aynı kişi beğenmişse, bildirimi ekleme
                            }

                            const userRef = collection(db, "users");
                            const userQuery = query(userRef, where("uid", "==", likerUid));
                            const userSnapshot = await getDocs(userQuery);

                            userSnapshot.forEach((userDoc) => {
                                const userData = userDoc.data();
                                fetchedNotifications.push({
                                    likerUid: likerUid,
                                    likerProfilePic: userData.profileImage || "",
                                    likerName: userData.fullName || "Bilinmeyen Kullanıcı",
                                    postTitle: data.title || "Bilinmeyen Gönderi",
                                });
                            });
                        }
                    }
                }

                setNotifications(fetchedNotifications);
                console.log(fetchedNotifications);
            } catch (error) {
                console.error("Bildirimler alınırken hata oluştu:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    if (loading) {
        return (
            <div
                style={{
                    height: "50vh",
                }}
                className="d-flex justify-content-center align-items-center loading-spinner-container"
            >
                <Spinner className="m-5" color="secondary">
                    Loading...
                </Spinner>
            </div>
        );
    }

    if (notifications.length === 0) {
        return <p className="text-center p-5 m-5 fs-4 fw-semibold">Henüz bir bildiriminiz yok.</p>;
    }

    return (
        <>
            <h2>Bildirimler</h2>
            {notifications.map((notification, index) => (
                <Card className="mb-3 shadow-sm" key={index}>
                    <CardBody>
                        <Row className="align-items-center">
                            <Col xs="auto">
                                <img
                                    src={notification.likerProfilePic}
                                    alt={`${notification.likerName}'nin profili`}
                                    className="rounded-circle"
                                    style={{ width: "40px", height: "40px", objectFit: "cover" }}
                                />
                            </Col>
                            <Col>
                                <span className="fw-bold text-dark">{notification.likerName}</span>
                                <span className="text-muted"> adlı kullanıcı, </span>
                                <span className="text-primary fst-italic">“{notification.postTitle}”</span>
                                <span className="text-muted"> gönderinizi beğendi.</span>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            ))}
        </>
    );
};

export default NotificationCard;
