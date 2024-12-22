import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Input, Spinner, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { db, auth } from "../../../firebase"; // auth import
import { collection, getDocs, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ExplorePageContents = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [snippets, setSnippets] = useState([]);
    const [filteredSnippets, setFilteredSnippets] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [likedSnippets, setLikedSnippets] = useState({});
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

                    // Fetch likes from Firestore
                    const snippetDocRef = doc(db, "snippets", snippetId);
                    const snippetDoc = await getDoc(snippetDocRef);
                    const snippetLikes = snippetDoc.exists() ? snippetDoc.data().likes || [] : [];
                    fetchedSnippets.push({ ...snippetData, id: snippetId, likes: snippetLikes });
                }

                setSnippets(fetchedSnippets);
                setFilteredSnippets(fetchedSnippets);

                // Initialize likedSnippets with fetched like data
                const likedMap = {};
                fetchedSnippets.forEach((snippet) => {
                    const user = auth.currentUser;
                    if (user && snippet.likes.includes(user.uid)) {
                        likedMap[snippet.id] = true;
                    } else {
                        likedMap[snippet.id] = false;
                    }
                });
                setLikedSnippets(likedMap);
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

    const handleLike = async (snippetId) => {
        const user = auth.currentUser;

        if (user) {
            const userId = user.uid;
            const snippetRef = doc(db, "snippets", snippetId);

            try {
                // Fetch the current likes for the snippet
                const snippetDoc = await getDoc(snippetRef);
                const snippetData = snippetDoc.data();
                const likes = snippetData.likes || [];

                if (likes.includes(userId)) {
                    // If user already liked, remove the like
                    await updateDoc(snippetRef, {
                        likes: arrayRemove(userId), // Removing userId from likes array
                    });
                    setLikedSnippets((prev) => ({
                        ...prev,
                        [snippetId]: false, // Update state to reflect unliked status
                    }));
                } else {
                    // If user hasn't liked, add the like
                    await updateDoc(snippetRef, {
                        likes: arrayUnion(userId), // Adding userId to likes array
                    });
                    setLikedSnippets((prev) => ({
                        ...prev,
                        [snippetId]: true, // Update state to reflect liked status
                    }));
                }
            } catch (error) {
                console.error("Error updating likes: ", error);
            }
        } else {
            console.log("Please log in.");
        }
    };

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
                            <Card
                                style={{
                                    maxHeight: "300px"
                                }}
                                className="position-relative"
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                                onClick={() => navigate(`/content/${snippet.id}`)}
                            >
                                <CardImg
                                    style={{
                                        height: "200px",
                                        objectFit: "cover"
                                    }}
                                    top
                                    width="100%"
                                    src={snippet.image || "https://picsum.photos/400/300"}
                                    alt="Snippet preview"
                                />
                                <CardBody
                                    className={`position-absolute w-100 h-100 top-0 start-0 bg-dark bg-opacity-75 text-white transition-opacity ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ transition: 'opacity 0.3s ease' }}
                                >
                                    <CardTitle tag="h4" style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                                        {snippet.title || "Untitled Snippet"}
                                    </CardTitle>
                                    <CardSubtitle className="mb-2 text-warning">
                                        {snippet.programmingLanguage || "Unknown Category"}
                                    </CardSubtitle>
                                    <CardText style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
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

                                    {/* Like Button */}
                                    <Button
                                        className={`mt-2 bg-transparent border-2 rounded-5 text-white ${likedSnippets[snippet.id] ? 'text-danger' : 'text-dark'}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleLike(snippet.id);
                                        }}
                                    >
                                        {likedSnippets[snippet.id] ? <FaHeart /> : <FaRegHeart />} Like
                                    </Button>
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
