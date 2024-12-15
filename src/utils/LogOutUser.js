import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logout } from "./authSlice";

const logoutUser = async () => {
  const auth = getAuth();
  const dispatch = useDispatch();

  try {
    await auth.signOut();
    dispatch(logout());
    console.log("User logged out successfully.");
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
};

export default logoutUser;
