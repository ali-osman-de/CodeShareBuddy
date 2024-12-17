import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase"; 

const RegisterUser = async (auth, email, password, fullName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    await updateProfile(userCredential.user, {
      displayName: fullName,
    });

    const userDocRef = doc(db, "users", userCredential.user.uid);
    await setDoc(userDocRef, {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      fullName: fullName,
      createdAt: new Date().toISOString(),
    });

    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default RegisterUser;
