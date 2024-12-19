import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Button, Input, Form, FormGroup, Label } from "reactstrap";
import { db } from "../../../firebase";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

const CreatePage = () => {
    const location = useLocation();
    const { code } = location.state || {}; // Gelen veriyi al
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

    useEffect(() => {
        if (code) {
            // Eğer düzenleme için veri geldiyse, formu doldur
            setFormData({
                title: code.title || "",
                description: code.description || "",
                code: code.code || "",
                programmingLanguage: code.programmingLanguage || "JavaScript",
                image: code.image || null,
            });
        }
    }, [code]);

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

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            let base64Image = "";

            if (formData.image && typeof formData.image !== "string") {
                base64Image = await convertToBase64(formData.image);
            }

            if (code) {
                // Eğer düzenleme yapılıyorsa
                const snippetRef = doc(db, "snippets", code.id); // Mevcut dökümanı güncelle
                await setDoc(snippetRef, {
                    ...formData,
                    uid,
                    image: base64Image || formData.image,
                    updatedAt: new Date(),
                });
            } else {
                // Yeni bir snippet oluşturuluyorsa
                const snippetRef = collection(db, "snippets");
                await addDoc(snippetRef, {
                    ...formData,
                    uid,
                    image: base64Image,
                    createdAt: new Date(),
                });
            }

            console.log("Snippet successfully saved!");
        } catch (error) {
            console.error("Error saving snippet:", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <Container style={{ maxWidth: "800px" }}>
            <h2 className="mb-3">{code ? "Edit Snippet" : "New Snippet"}</h2>
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
                    <Label for="code">Code</Label>
                    <Input
                        type="textarea"
                        name="code"
                        id="code"
                        placeholder="Paste your code here"
                        value={formData.code}
                        onChange={handleChange}
                        style={{ minHeight: "200px", fontFamily: "monospace" }}
                    />
                </FormGroup>

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
                    {uploading ? "Saving..." : code ? "Update" : "Share"}
                </Button>
            </Form>
        </Container>
    );
};

export default CreatePage;
