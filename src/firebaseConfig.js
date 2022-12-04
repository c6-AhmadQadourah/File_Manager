// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxXy-AirWmbYzWJkRuWneRjHqKfbpVFmU",
  authDomain: "file-manager-b8771.firebaseapp.com",
  projectId: "file-manager-b8771",
  storageBucket: "file-manager-b8771.appspot.com",
  messagingSenderId: "370916690882",
  appId: "1:370916690882:web:d4f14ba13bdc773f2ea45b",
  measurementId: "G-MJFGGV74X2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);