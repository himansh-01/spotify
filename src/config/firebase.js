import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBL17XbQMizqlsCzmSA37dsvdnowGBkoww",
  authDomain: "spotify-e0bea.firebaseapp.com",
  projectId: "spotify-e0bea",
  storageBucket: "spotify-e0bea.firebasestorage.app",
  messagingSenderId: "989385642145",
  appId: "1:989385642145:web:8f00f44dff4cd2468c60e0",
  measurementId: "G-K7ND7BWR3G"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);