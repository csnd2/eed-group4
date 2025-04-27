import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// Initialize Firebase lazily
let app;
let auth;
let database;

const initializeFirebase = () => {
  if (!app) {
    const firebaseConfig = {
      apiKey: "AIzaSyD76lHGZfHrzT2CF-fEuIMoGTwXD0j-yPU",
      authDomain: "edc-fedponek.firebaseapp.com",
      projectId: "edc-fedponek",
      storageBucket: "edc-fedponek.firebasestorage.app",
      messagingSenderId: "369636473155",
      appId: "1:369636473155:web:715e95139a0c2e9bb057f6"
    };
    
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    database = getDatabase(app);
  }
  return { app, auth, database };
};

// Export getters that initialize Firebase only when needed
export const getFirebaseApp = () => {
  const { app } = initializeFirebase();
  return app;
};

export const getFirebaseAuth = () => {
  const { auth } = initializeFirebase();
  return auth;
};

export const getFirebaseDatabase = () => {
  const { database } = initializeFirebase();
  return database;
};

// Set optimal zoom level
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.zoom = '100%';
});