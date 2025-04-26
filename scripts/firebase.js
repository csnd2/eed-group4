import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";  
import { getDatabase} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";  

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD76lHGZfHrzT2CF-fEuIMoGTwXD0j-yPU",
  authDomain: "edc-fedponek.firebaseapp.com",
  projectId: "edc-fedponek",
  storageBucket: "edc-fedponek.firebasestorage.app",
  messagingSenderId: "369636473155",
  appId: "1:369636473155:web:715e95139a0c2e9bb057f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  
const database = getDatabase(app); 
export { auth, database };

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.zoom = '100%';
});