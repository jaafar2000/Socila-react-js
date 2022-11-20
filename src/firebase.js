import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA0X1Vp5-lzmrEtPOE7mfDl53IUtcI_Kyc",
  authDomain: "social-dc3a8.firebaseapp.com",
  projectId: "social-dc3a8",
  storageBucket: "social-dc3a8.appspot.com",
  messagingSenderId: "103201386727",
  appId: "1:103201386727:web:0c614cb048736bf82b3242"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { auth, provider, storage };
export default db;