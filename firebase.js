import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAdCpCGVlsQLvUaXJ9o2EWVNc8uRLljkVo",
  authDomain: "codesharebody.firebaseapp.com",
  projectId: "codesharebody",
  storageBucket: "codesharebody.firebasestorage.app",
  messagingSenderId: "450679181743",
  appId: "1:450679181743:web:870656256761255a85df5a",
  measurementId: "G-H3294B520E",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
