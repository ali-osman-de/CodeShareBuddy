import { signInWithEmailAndPassword } from "firebase/auth";

const LogInUser = async (auth, email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User logged in successfully:", user);
    return user;
  } catch (error) {
    console.error("Error logging in user:", error.message);
    throw new Error(error.message);
  }
};

export default LogInUser;
