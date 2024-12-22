import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Button, Input, Form, FormGroup, Label, Card, CardBody, Toast, ToastBody, ToastHeader } from "reactstrap";
import { db } from "../../../firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Editor } from "@monaco-editor/react";

const CreatePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { uid } = useSelector((state) => state.auth);

    const [isEdit, setIsEdit] = useState(false);
    const [docId, setDocId] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        code: "",
        programmingLanguage: "JavaScript",
        image: null,
    });

    const [uploading, setUploading] = useState(false);
    const [toast, setToast] = useState({ show: false, success: false, message: "" });

    const languages = ["JavaScript", "Python", "TypeScript", "Java", "C++", "Go"];

    // Initial state setup when editing or creating
    useEffect(() => {
        if (location.state && location.state.code) {
            setFormData(location.state.code);
            setIsEdit(location.state.isEdit || false);
            setDocId(location.state.code.id || null);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleLanguageSelect = (lang) => {
        setFormData((prevState) => ({ ...prevState, programmingLanguage: lang }));
    };

    const handleImageChange = (e) => {
        setFormData((prevState) => ({ ...prevState, image: e.target.files[0] }));
    };

    const convertToBase64AndResize = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64Data = reader.result;
                const img = new Image();
                img.src = base64Data;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const maxWidth = 500;
                    const maxHeight = 500;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height = (height * maxWidth) / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width = (width * maxHeight) / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL());
                };
                img.onerror = (error) => reject(error);
            };
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description) {
            setToast({
                show: true,
                success: false,
                message: "Title and description are required fields.",
            });
            setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
            return;
        }

        setUploading(true);

        try {
            let base64Image = formData.image;

            if (formData.image && typeof formData.image !== 'string') {
                base64Image = await convertToBase64AndResize(formData.image);
            }

            if (isEdit && docId) {
                const snippetRef = doc(db, "snippets", docId);
                await updateDoc(snippetRef, {
                    ...formData,
                    uid,
                    image: base64Image,
                    updatedAt: new Date(),
                });

                setToast({
                    show: true,
                    success: true,
                    message: "Snippet successfully updated!",
                });
                console.log("Snippet successfully updated!");
            } else {
                const snippetRef = collection(db, "snippets");
                await addDoc(snippetRef, {
                    ...formData,
                    uid,
                    image: base64Image,
                    createdAt: new Date(),
                });

                setToast({
                    show: true,
                    success: true,
                    message: "Snippet successfully created!",
                });
                console.log("Snippet successfully created!");
            }

            setTimeout(() => {
                setToast((prev) => ({ ...prev, show: false }));
                navigate("/profile");
            }, 3000);
        } catch (error) {
            console.error("Error creating/updating snippet:", error);
            setToast({
                show: true,
                success: false,
                message: "Error creating/updating snippet, please try again.",
            });
            setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
        } finally {
            setUploading(false);
        }
    };

    return (
        <Container style={{ maxWidth: "800px" }}>
            <h2 className="mb-3">{isEdit ? "Edit Snippet" : "New Snippet"}</h2>
            <p className="text-muted">
                <strong>Sharing is good!</strong> Here is the fastest and easiest way to share your code with the world. Paste your code into the editor below, select your programming language and click <strong>'Share'.</strong> Create a great snippet that everyone will benefit from!
            </p>

            {/* Toast Notification */}
            {toast.show && (
                <div
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        zIndex: 1050,
                    }}
                >
                    <Toast isOpen={toast.show}>
                        <ToastHeader color={toast.success ? "success" : "warning"}>
                            {toast.success ? "Success" : "Error"}
                        </ToastHeader>
                        <ToastBody>{toast.message}</ToastBody>
                    </Toast>
                </div>
            )}

            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Enter title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                        type="textarea"
                        name="description"
                        id="description"
                        placeholder="Enter description"
                        value={formData.description}
                        onChange={handleChange}
                        style={{ minHeight: "100px" }}
                        required
                    />
                </FormGroup>

                <div className="mb-3">
                    {languages.map((lang) => (
                        <Button
                            key={lang}
                            outline
                            color="primary"
                            className="me-2 mb-2 text-dark"
                            onClick={() => handleLanguageSelect(lang)}
                            active={formData.programmingLanguage === lang}
                        >
                            {lang}
                        </Button>
                    ))}
                </div>

                <FormGroup>
                    <Card>
                        <CardBody className="bg-secondary">
                            <Editor
                                className="bg-dark"
                                value={formData.code}
                                onChange={(value) => setFormData((prevState) => ({ ...prevState, code: value }))}
                                height="200px"
                                language={formData.programmingLanguage.toLowerCase()}
                                defaultValue="// Start writing your code here"
                                options={{
                                    fontSize: 14,
                                    minimap: { enabled: false },
                                }}
                            />
                        </CardBody>
                    </Card>
                </FormGroup>

                {/* Image Upload Input */}
                <FormGroup>
                    <Label for="image">Image</Label>
                    <Input
                        type="file"
                        name="image"
                        id="image"
                        onChange={handleImageChange}
                    />
                </FormGroup>

                <Button
                    type="submit"
                    color="primary"
                    style={{
                        width: "100%",
                        backgroundColor: "#3a86ff",
                        border: "none",
                        fontSize: "1.1rem",
                    }}
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : isEdit ? "Update" : "Share"}
                </Button>
            </Form>
        </Container>
    );
};

export default CreatePage;
