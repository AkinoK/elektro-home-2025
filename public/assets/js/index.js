import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyBNVc0Hg4-PecMH0ZdFRPkZqdGL2bQHRho",
    authDomain: "elektro-home-2025.firebaseapp.com",
    databaseURL: "https://elektro-home-2025.firebaseio.com",
    projectId: "elektro-home-2025",
    storageBucket: "elektro-home-2025.firebasestorage.app",
    messagingSenderId: "1082403793217",
    appId: "1:1082403793217:web:2be7b7b21afc784bd619c0"
  };


// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
