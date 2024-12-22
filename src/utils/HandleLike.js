import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const handleLike = async (snippetId) => {
  try {
    const snippetRef = doc(db, "snippets", snippetId);
    const snippetDoc = await getDoc(snippetRef);

    if (snippetDoc.exists()) {
      const snippetData = snippetDoc.data();
      const isLiked = snippetData.likes?.includes(uid);

      if (isLiked) {
        await updateDoc(snippetRef, {
          likes: arrayRemove(uid),
        });
      } else {
        await updateDoc(snippetRef, {
          likes: arrayUnion(uid),
        });
      }
    }
  } catch (error) {
    console.error("Error updating like status:", error);
  }
};
