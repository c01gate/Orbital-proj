// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFEXb40T2AP47uKoHunx_vVWhjdmhx2RA",
  authDomain: "rhapsody-auth.firebaseapp.com",
  projectId: "rhapsody-auth",
  storageBucket: "rhapsody-auth.appspot.com",
  messagingSenderId: "165343430250",
  appId: "1:165343430250:web:77ac045e2d0398cbccac13",
  measurementId: "G-5N31PX21JN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app }
export { auth }
export { analytics }