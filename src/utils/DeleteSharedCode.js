import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

const DeleteSharedCode = async (codeId) => {
  try {
    // Confirm deletion
    const confirmed = window.confirm(
      "Are you sure you want to delete this code?"
    );
    if (!confirmed) return;

    // Reference the document in Firestore
    const snippetRef = doc(db, "snippets", codeId);

    // Delete the document
    await deleteDoc(snippetRef);

    console.log(`Code deleted successfully.`);
    return true; // Indicate successful deletion
  } catch (error) {
    console.error("Error deleting shared code:", error);
    return false; // Indicate failure
  }
};

export default DeleteSharedCode;
