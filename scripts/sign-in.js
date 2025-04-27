import { auth, database } from './firebase.js';

import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

import { ref, onValue } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

import updateUI from './index.js';

// Cache DOM elements
const form = document.getElementById('js-form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const signInButton = document.getElementById('sign-btn');

// Add loading state
let isLoading = false;

// Form validation
function validateForm() {
  // Clear previous error states
  email.style.borderColor = '';
  password.style.borderColor = '';
  
  let isValid = true;
  
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

// Auto-fill email if available
const savedEmail = localStorage.getItem('lastLoginEmail');
if (savedEmail) {
  email.value = savedEmail;
}

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('User is signed in:', user);
    updateUI(user);
    // handleUserData(user)
  } else {
    console.log('No user is signed in.');
    // You can redirect to a login page or display a message
  }
});

function handleSignIn(e) {
  e.preventDefault();

  if (isLoading || !validateForm()) return;

  const emailValue = email.value;
  const passwordValue = password.value;

  signInButton.disabled = true;
  signInButton.textContent = 'Signing in...';

  localStorage.setItem('lastLoginEmail', emailValue);

  signInWithEmailAndPassword(auth, emailValue, passwordValue)
    .then((userCredential) => {

      const user = userCredential.user;
      alert(`Welcome back, ${user.fullname || user.email}!`);
      localStorage.setItem('userId', user.uid);
      window.location.href = 'index.html';
      sessionStorage.setItem('isLoggedIn', 'true');
      updateUI(user);
      handleUserData(user);
    })
    .catch((error) => {
      let errorMessage = 'Sign-in failed. Please try again.'; // Default error message

      // Handle sign-in errors
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No user corresponding to the given email. Please check your email or create an account.';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'No user corresponding to the given email. Please check your email or create an account.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'The password is invalid or the user does not have a password. Please try again.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'The email address is badly formatted. Please enter a valid email address.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed login attempts. Please try again later.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'A network error has occurred. Please check your internet connection and try again.';
          break;
        default:
          errorMessage = error.message;
      }
      console.error('Error signing in: ', error.message);
      alert(errorMessage);
    })
    .finally(() => {
      isLoading = false;
      signInButton.disabled = false;
      signInButton.textContent = 'SIGN IN';
    });
}

function handleUserData(user) {
  const userRef = ref(database, 'users/' + user.uid);

  onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      localStorage.setItem("userFullname", data.fullname);
      localStorage.setItem("userId", data.uid);
      console.log(localStorage.setItem("userId", data.uid));
      // sendOTP();
      window.location.replace("index.html");
    } else {
      alert('Account Not found');
    }
  }, (error) => {
    console.error('Database error:', error);
  });

}

document.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', handleSignIn);
  document.body.style.zoom = '100%';
});