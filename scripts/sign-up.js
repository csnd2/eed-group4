import { auth, database } from './firebase.js';

import { createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js"; 

import { ref, set } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js"; 

const createAccForm = document.getElementById('js-form');


function createAccount(e) {
  e.preventDefault();
  const fullname = document.getElementById('fullname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const createAccBtn = document.getElementById('create-acc-btn');

  createAccBtn.disabled = true
  createAccBtn.innerHTML = 'Creating Account...'

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;

    const userRef = ref(database, `users/${user.uid}`)

    return set(userRef, {
      fullname: fullname,
      email: email,
      createdAt: new Date().toISOString()
    })
    .then(() => {
     alert('User details saved successfully.');  
      createAccForm.reset()
      window.location.href = 'sign-in.html';
    })
    .catch((error) => {
      console.error('Error signing up: ', error.message);  
      alert('Sign-up failed: ' + error.message);
    })
  })
  .finally(() => {  
    createAccBtn.disabled = false; 
    createAccBtn.innerHTML = 'Create Account'; 
  });  


}

document.addEventListener('DOMContentLoaded', () => {
  createAccForm.addEventListener('submit', createAccount)
})