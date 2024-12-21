import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Input, Spinner } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { db } from "../../../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const ExplorePageContents = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [snippets, setSnippets] = useState([]);
    const [filteredSnippets, setFilteredSnippets] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSnippets = async () => {
            try {
                const snippetsRef = collection(db, "snippets");
                const querySnapshot = await getDocs(snippetsRef);

                const fetchedSnippets = [];
                for (const docSnap of querySnapshot.docs) {
                    const snippetData = docSnap.data();
                    const snippetId = docSnap.id;


                    if (snippetData.uid) {
                        const userDocRef = doc(db, "users", snippetData.uid);
                        const userDoc = await getDoc(userDocRef);
                        if (userDoc.exists()) {
                            snippetData.author = userDoc.data().nickName || "Unknown";
                        }
                    }


                    if (snippetData.createdAt && snippetData.createdAt.seconds) {
                        snippetData.createdAt = new Date(snippetData.createdAt.seconds * 1000).toLocaleDateString();
                    }

                    fetchedSnippets.push({ ...snippetData, id: snippetId });
                }

                setSnippets(fetchedSnippets);
                setFilteredSnippets(fetchedSnippets);
            } catch (error) {
                console.error("Error fetching snippets: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSnippets();
    }, []);


    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredSnippets(snippets);
        } else {
            const query = searchQuery.toLowerCase();
            const filtered = snippets.filter(snippet =>
                snippet.title?.toLowerCase().includes(query) ||
                snippet.description?.toLowerCase().includes(query) ||
                snippet.programmingLanguage?.toLowerCase().includes(query) ||
                snippet.author?.toLowerCase().includes(query)
            );
            setFilteredSnippets(filtered);
        }
    }, [searchQuery, snippets]);

    if (loading) {
        return (
            <div style={{
                height: "50vh"
            }} className="d-flex justify-content-center align-items-center loading-spinner-container">
                <Spinner className="m-5" color="secondary">
                    Loading...
                </Spinner>
            </div>
        );
    }

    return (
        <Row>
            <Col xs="12" className="d-flex justify-content-between align-items-center mb-4">
                <h2>Explore</h2>
                <Input
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-25 bg-white text-dark mx-4"
                    style={{
                        borderRadius: '20px',
                        padding: '8px 16px'
                    }}
                />
            </Col>

            <Row className="mt-4">
                {filteredSnippets.length > 0 ? (
                    filteredSnippets.map((snippet, index) => (
                        <Col xs="4" key={snippet.id} className="mb-4">
                            <Card style={{
                                maxHeight: "300px"
                            }} className="position-relative"
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                                onClick={() => navigate(`/content/${snippet.id}`)}>
                                <CardImg
                                    style={{
                                        height: "200px",
                                        objectFit: "100%"
                                    }}
                                    top
                                    width="100%"
                                    src={snippet.image || "https://picsum.photos/400/300"}
                                    alt="Snippet preview"
                                />
                                <CardBody className={`position-absolute w-100 h-100 top-0 start-0 bg-dark bg-opacity-75 text-white transition-opacity ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ transition: 'opacity 0.3s ease' }}>
                                    <CardTitle tag="h4" style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>{snippet.title || "Untitled Snippet"}</CardTitle>
                                    <CardSubtitle className="mb-2 text-warning">
                                        {snippet.programmingLanguage || "Unknown Category"}
                                    </CardSubtitle>
                                    <CardText style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {snippet.description || "No description provided..."}
                                    </CardText>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <small>@{snippet.author || "Unknown"}</small>
                                        <small>{snippet.createdAt || "N/A"}</small>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col xs="12">
                        <p className="text-center text-muted">No results found for "{searchQuery}".</p>
                    </Col>
                )}
            </Row>
        </Row>
    );
};

export default ExplorePageContents;
