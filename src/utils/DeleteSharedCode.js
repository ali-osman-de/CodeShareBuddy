import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

const DeleteSharedCode = async (codeId) => {
  try {
    const snippetRef = doc(db, "snippets", codeId);
    await deleteDoc(snippetRef);
    return true;
  } catch (error) {
    console.error("Error deleting shared code:", error);
    return false;
  }
};

export default DeleteSharedCode;
