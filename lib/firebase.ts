import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBUx5McaBW7AndoNjGZs3Gtj0u-hdj5IEI",
  authDomain: "vestory-31193.firebaseapp.com",
  projectId: "vestory-31193",
  storageBucket: "vestory-31193.firebasestorage.app",
  messagingSenderId: "1027945762248",
  appId: "1:1027945762248:web:d7c670ac84c0a1e33cc4fd",
  measurementId: "G-NZP6QXRPCE"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)