import React, { useState } from "react";
import { Container, Button, Input, Form, FormGroup, Label } from "reactstrap";

const CreatePage = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        code: "",
        programmingLanguage: "JavaScript",
    });

    const languages = ["JavaScript", "Python", "TypeScript", "Java", "C++", "Go"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleLanguageSelect = (lang) => {
        setFormData((prevState) => ({ ...prevState, programmingLanguage: lang }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <Container style={{ maxWidth: "800px"}}>
            <h2 className="mb-3">New Snippet</h2>
            <p className="text-muted">
                <strong>Sharing is good!</strong>  Here is the fastest and easiest way to share your code with the world. Paste your code into the editor below, select your programming language and click <strong>'Share'.</strong> Create a great snippet that everyone will benefit from!
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
                    <Label for="code">Code</Label>
                    <Input
                        type="textarea"
                        name="code"
                        id="code"
                        placeholder="Paste your code here"
                        value={formData.code}
                        onChange={handleChange}
                        style={{
                            minHeight: "200px",
                            fontFamily: "monospace",
                        }}
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
                >
                    Share
                </Button>
            </Form>
        </Container>
    );
};

export default CreatePage;