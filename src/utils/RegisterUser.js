import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth";

const RegisterUser = async (auth, email, password, fullName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    
    await updateProfile(userCredential.user, {
      displayName: fullName,
    });

    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default RegisterUser;
