// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBOE8ROklYCHaAN_7Ob9VD4rKmV-9tJVw",
  authDomain: "expense-tracker-d964c.firebaseapp.com",
  projectId: "expense-tracker-d964c",
  storageBucket: "expense-tracker-d964c.appspot.com",
  messagingSenderId: "412783200709",
  appId: "1:412783200709:web:d7f4fed004a884350d23ac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);