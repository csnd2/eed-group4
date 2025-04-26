import { auth, database } from './firebase.js';
import { ref, onValue, push, set} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

window.onload = () => {
  const saveLoggedIn = sessionStorage.getItem('isLoggedIn');

  if(saveLoggedIn == true){
    console.log('logged In');
    window.location.href = 'index.html'
  }
}

const getStartedBtn = document.getElementById('js-get-started');
const signInBtn = document.getElementById('js-sign-in');
const mobileSignInBtn = document.getElementById('js-sign-in-mobile');
const signOutBtn = document.getElementById('js-sign-out');
const mobileSignOutBtn = document.getElementById('js-sign-out-mobile');
const popUp = document.getElementById('js-popped-up');
const addSkillBtn = document.getElementById('js-add-skill');
const skilPopUp = document.getElementById('js-popup');
const addSkillForm = document.getElementById('add-skills-form');
const skillList = document.getElementById('skills-list')


document.addEventListener('DOMContentLoaded', ()=> {
  document.body.style.zoom = '100%';

  const userId = localStorage.getItem("userId");

  if(getStartedBtn){
    getStartedBtn.addEventListener('click', () => {
      window.location.href = 'sign-up.html';
    });
  }

  if(signInBtn){
    signInBtn.addEventListener('click', () => {
      window.location.href = 'sign-in.html'
    });
  };

  if(mobileSignInBtn){
    mobileSignInBtn.addEventListener('click', () => {
      window.location.href = 'sign-in.html'
    });
  };

  updateUI(auth.curentUser);


  const user = userId;  
  console.log('User signed in: ', user);
  if(user){
    const userRef = ref(database, 'users/' + user);

    onValue(userRef, (snapshot) => {
      const data = snapshot.val();  
      if (data) {
        // console.log(data.email)
        document.getElementById('js-user-dispaly-fullname').textContent = data.fullname; 
        document.getElementById('js-user-email').textContent = data.email; 
      }else {  
        console.log('No user data found.');   
        // window.location.href = "sign-in.html";  
      } 
    })
  } else {  
    console.log('No user is signed in.');   
    // window.location.href = "sign-in.html";   
  } ;
});

auth.onAuthStateChanged((user) => {
  updateUI(user);
})

export default function updateUI(user){
  if(signInBtn){
    if(user){
      signInBtn.style.display = 'none';
      mobileSignInBtn.style.display = 'none';
      mobileSignOutBtn.style.display = 'none'
      popUp.style.display = 'block';
      if(window.innerWidth <= 768){
        popUp.style.display = 'none';
        mobileSignOutBtn.style.display = 'flex'
      }
      signOutBtn.onclick = ()=> signOutUser();
      mobileSignOutBtn.onclick = ()=> signOutUser();
    }else{
      signInBtn.textContent = 'Sign in';
      mobileSignOutBtn.style.display = 'none'
      signInBtn.onlick = () => signInUser();
    }
  }

  if(getStartedBtn){
    if(user){
      getStartedBtn.textContent = 'Explore Our Program';
      getStartedBtn.onclick = () => redirectToUserSkill(user.user);
    }else{
      getStartedBtn.onclick = () => {
        window.location.href = 'sign-up.html'
      }
    }
  }
  if(addSkillBtn){
    if(user){
      addSkillBtn.onclick = () => handleAddSkill();
      addSkillForm.addEventListener('submit', handleSaveSkills)
    }else{
      addSkillBtn.onclick = () => {
        alert("Sign In to add a skill");
        window.location.href = 'sign-in.html';
      }
    }
  }
}

// sign in function
function signInUser(){
  window.location.href = 'sign-in.html';
}

// sign out funciton 
function signOutUser(){
  auth.signOut().then(() => {
    sessionStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('userId')
    updateUI(null);
    window.location.href = 'index.html'
  }) .catch(() => {
    console.error('Error signing Out:', error.message);
  })
}
function redirectToUserSkill(userId) {
  window.location.href = 'skills.html'
}

function handleAddSkill() {
  skilPopUp.style.display = 'flex';
}

function handleSaveSkills(e) {
  e.preventDefault();
  const skill = inpselectSkill.value.trim();
  const description = inpDescription.value.trim();
  const icon = inpselectIcon.value.trim();
  console.log(skill)
  console.log(description)
  console.log(icon)

  if(!skill || !description || !icon){
    alert('Please fill all the fields');  
    return
  }

  const skillRef = ref(database, `skills`);
  const newSkillRef = push(skillRef)
  set(newSkillRef, {
    skill,
    description,
    icon
  })
  .then(() => {
    console.log('skill added successfully');
    addSkillForm.reset();
    skilPopUp.style.display = 'none';
  })
  .catch(error => {
    console.log('Error saving skill' + error.message)
  })
  // alert('clicked')
}

// Ensure dynamically rendered skill cards are styled and aligned like the initial feature cards
function renderSkills() {
  const skillRef = ref(database, 'skills');
  onValue(skillRef, (snapshot) => {
    skillList.innerHTML = '';
    const skills = snapshot.val();

    if (skills) {
      Object.keys(skills).forEach((id) => {
        const { skill, description, icon } = skills[id];
        const skillDiv = document.createElement('div');
        skillDiv.className = 'card1';
        skillDiv.innerHTML = `
          <div class="icon-div" style="background-color: rgb(59, 3, 50);">
            <i class="${icon}" style="color: yellow;"></i>
          </div>
          <h3 style="color: rgb(150, 150, 19);">${skill}</h3>
          <p style="color: aliceblue;">${description}</p>
        `;
        skillList.appendChild(skillDiv);
      });
      
      // Adjust all cards after rendering
      const adjustFeatureCards = () => {
        const cards = document.querySelectorAll('.features-cards > div');
        cards.forEach(card => {
          card.style.flex = '1';
          card.style.minWidth = '300px';
          card.style.maxWidth = '380px';
          card.style.margin = '10px';
          card.style.padding = '20px';
          card.style.backgroundColor = 'rgb(59, 3, 50)';
          card.style.borderRadius = '10px';
          card.style.textAlign = 'center';
          card.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2)';
        });
      };
      
      adjustFeatureCards();
      window.addEventListener('resize', adjustFeatureCards);
    } else {
      skillList.innerHTML = '<p style="color: aliceblue; text-align: center;">No Skills Added Yet</p>';
    }
  });
}

renderSkills();