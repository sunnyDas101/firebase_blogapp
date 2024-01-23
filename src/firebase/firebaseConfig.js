import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrZMpjnHxA29SaDnBb7yjO4dMuaKdadY8",
  authDomain: "blogapp-react-151ea.firebaseapp.com",
  projectId: "blogapp-react-151ea",
  storageBucket: "blogapp-react-151ea.appspot.com",
  messagingSenderId: "44613937249",
  appId: "1:44613937249:web:961a72b07b39da5dae6220",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
