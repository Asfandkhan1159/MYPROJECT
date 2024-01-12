// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7YdsY8OLVsq9sIwMdWedLTtSJ3si4dck",
  authDomain: "otpveri-96c31.firebaseapp.com",
  projectId: "otpveri-96c31",
  storageBucket: "otpveri-96c31.appspot.com",
  messagingSenderId: "184069241414",
  appId: "1:184069241414:web:fe77521639aeec409da847",
  measurementId: "G-E9JG3DRQTM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
