// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQ5rgryDTHAbb58GGJ-MYcDB2YHQVXitM",
  authDomain: "shram-2c8b8.firebaseapp.com",
  projectId: "shram-2c8b8",
  storageBucket: "shram-2c8b8.firebasestorage.app",
  messagingSenderId: "738069414450",
  appId: "1:738069414450:web:77a267dd11321d7166b22b",
  measurementId: "G-DMWB9HRJBD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);