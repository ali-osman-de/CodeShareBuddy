import React, { useState } from "react";
import { Container, Button, Input, Form, FormGroup, Label, Card, CardBody } from "reactstrap";
import { db } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Editor } from "@monaco-editor/react";

const CreatePage = () => {
    const { uid } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        code: "",
        programmingLanguage: "JavaScript",
        image: null,
    });

    const [uploading, setUploading] = useState(false);
    const languages = ["JavaScript", "Python", "TypeScript", "Java", "C++", "Go"];

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

    // Resmi base64 formatına dönüştürme
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result); // reader.result -> Base64 verisi
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            let base64Image = "";

            if (formData.image) {
                // Resmi Base64 formatına dönüştür
                base64Image = await convertToBase64(formData.image);
            }

            // Firestore'a veri kaydet
            const snippetRef = collection(db, "snippets");
            await addDoc(snippetRef, {
                ...formData,
                uid,
                image: base64Image, // Base64 formatında resmi veritabanına ekle
                createdAt: new Date(),
            });

            console.log("Snippet successfully created!");
        } catch (error) {
            console.error("Error creating snippet:", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <Container style={{ maxWidth: "800px" }}>
            <h2 className="mb-3">New Snippet</h2>
            <p className="text-muted">
                <strong>Sharing is good!</strong> Here is the fastest and easiest way to share your code with the world. Paste your code into the editor below, select your programming language and click <strong>'Share'.</strong> Create a great snippet that everyone will benefit from!
            </p>
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


                {/* Resim Yükleme Input'u */}
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
                    {uploading ? "Uploading..." : "Share"}
                </Button>
            </Form>
        </Container>
    );
};

export default CreatePage;
