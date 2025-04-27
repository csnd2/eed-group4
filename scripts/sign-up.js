import { auth, database } from './firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// Cache DOM elements
const form = document.getElementById('js-form');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const createButton = document.getElementById('create-acc-btn');

// Add loading state
let isLoading = false;

// Form validation with detailed feedback
function validateForm() {
  // Clear previous error states
  fullname.style.borderColor = '';
  email.style.borderColor = '';
  password.style.borderColor = '';
  
  let isValid = true;
  
  if (!fullname.value || fullname.value.length < 2) {
    fullname.style.borderColor = 'red';
    isValid = false;
  }
  
  if (!email.value || !email.value.includes('@')) {
    email.style.borderColor = 'red';
    isValid = false;
  }
  
  if (!password.value || password.value.length < 6) {
    password.style.borderColor = 'red';
    isValid = false;
  }
  
  return isValid;
}

async function handleSignUp(e) {
  e.preventDefault();
  
  if (isLoading || !validateForm()) return;
  
  try {
    isLoading = true;
    createButton.disabled = true;
    createButton.textContent = 'Creating Account...';
    
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;
    
    // Store user data in database
    await set(ref(database, 'users/' + user.uid), {
      fullname: fullname.value,
      email: email.value,
      uid: user.uid
    });
    
    // Store info for autofill
    localStorage.setItem('lastLoginEmail', email.value);
    localStorage.setItem('userFullname', fullname.value);
    localStorage.setItem('userId', user.uid);
    
    // Success message and redirect
    alert('Account created successfully!');
    window.location.href = 'index.html';
    
  } catch (error) {
    console.error('Sign up error:', error);
    let errorMessage = 'Registration failed. Please try again.';
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'This email is already registered. Please sign in or use a different email.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Please enter a valid email address.';
        break;
      case 'auth/weak-password':
        errorMessage = 'Password should be at least 6 characters long.';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Network error. Please check your internet connection.';
        break;
    }
    
    alert(errorMessage);
    
  } finally {
    isLoading = false;
    createButton.disabled = false;
    createButton.textContent = 'Create Account';
  }
}

// Initialize form handling
document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', handleSignUp);
  document.body.style.zoom = '100%';
});