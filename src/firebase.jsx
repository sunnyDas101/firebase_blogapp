import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC0ZkNffPfI7ecqOxQdQq1WkjTJqGq2NoY",
    authDomain: "react-blogapp-35316.firebaseapp.com",
    projectId: "react-blogapp-35316",
    storageBucket: "react-blogapp-35316.appspot.com",
    messagingSenderId: "1088397403421",
    appId: "1:1088397403421:web:85e5fa8076ff7be11dedf4"
  };

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)
  const storage = getStorage(app)

  export { auth, db, storage }