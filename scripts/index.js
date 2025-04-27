import { auth, database } from './firebase.js';
import { ref, onValue, push, set } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

window.onload = () => {
  const saveLoggedIn = sessionStorage.getItem('isLoggedIn');

  if (saveLoggedIn == true) {
    console.log('logged In');
    window.location.href = 'index.html';
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Set optimal zoom level
  document.body.style.zoom = '100%';

  // Cache frequently accessed elements
  const elements = {
    getStartedBtn: document.getElementById('js-get-started'),
    signInBtn: document.getElementById('js-sign-in'),
    mobileSignInBtn: document.getElementById('js-sign-in-mobile'),
    signOutBtn: document.getElementById('js-sign-out'),
    mobileSignOutBtn: document.getElementById('js-sign-out-mobile'),
    popUp: document.getElementById('js-popped-up'),
    addSkillBtn: document.getElementById('js-add-skill'),
    skilPopUp: document.getElementById('js-popup'),
    addSkillForm: document.getElementById('add-skills-form'),
    skillList: document.getElementById('skills-list')
  };

  // Debounce function for performance optimization
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  // Optimize UI updates
  const updateUIEfficiently = debounce((user) => {
    if (elements.signInBtn) {
      if (user) {
        elements.signInBtn.style.display = 'none';
        elements.mobileSignInBtn.style.display = 'none';
        elements.mobileSignOutBtn.style.display = 'none';
        elements.popUp.style.display = 'block';

        if (window.innerWidth <= 768) {
          elements.popUp.style.display = 'none';
          elements.mobileSignOutBtn.style.display = 'flex';
        }
      } else {
        elements.signInBtn.textContent = 'Sign in';
        elements.mobileSignOutBtn.style.display = 'none';
      }
    }

    if (elements.getStartedBtn) {
      if (user) {
        elements.getStartedBtn.textContent = 'Explore Our Program';
        elements.getStartedBtn.onclick = () => window.location.href = 'skills.html';
      } else {
        elements.getStartedBtn.onclick = () => window.location.href = 'sign-up.html';
      }
    }
  }, 100);

  // Optimize skill rendering
  const renderSkillsEfficiently = () => {
    if (!elements.skillList) return;

    const fragment = document.createDocumentFragment();
    const skills = Object.values(snapshot.val() || {});

    skills.forEach(({ skill, description, icon }) => {
      const skillDiv = document.createElement('div');
      skillDiv.className = 'card1';
      skillDiv.innerHTML = `
        <div class="icon-div" style="background-color: rgb(59, 3, 50);">
          <i class="${icon}" style="color: yellow;"></i>
        </div>
        <h3 style="color: rgb(150, 150, 19);">${skill}</h3>
        <p style="color: aliceblue;">${description}</p>
      `;
      fragment.appendChild(skillDiv);
    });

    elements.skillList.innerHTML = '';
    elements.skillList.appendChild(fragment);
  };

  // Initialize event listeners
  if (elements.signOutBtn) {
    elements.signOutBtn.onclick = signOutUser;
  }
  if (elements.mobileSignOutBtn) {
    elements.mobileSignOutBtn.onclick = signOutUser;
  }

  // Handle initial auth state
  const userId = localStorage.getItem("userId");
  if (userId) {
    updateUIEfficiently(true);
  }
});

auth.onAuthStateChanged((user) => {
  updateUI(user);
});

export default function updateUI(user) {
  const elements = {
    getStartedBtn: document.getElementById('js-get-started'),
    signInBtn: document.getElementById('js-sign-in'),
    mobileSignInBtn: document.getElementById('js-sign-in-mobile'),
    signOutBtn: document.getElementById('js-sign-out'),
    mobileSignOutBtn: document.getElementById('js-sign-out-mobile'),
    popUp: document.getElementById('js-popped-up'),
    addSkillBtn: document.getElementById('js-add-skill'),
    skilPopUp: document.getElementById('js-popup'),
    addSkillForm: document.getElementById('add-skills-form'),
    skillList: document.getElementById('skills-list')
  };

  if (elements.signInBtn) {
    if (user) {
      elements.signInBtn.style.display = 'none';
      elements.mobileSignInBtn.style.display = 'none';
      elements.mobileSignOutBtn.style.display = 'none';
      elements.popUp.style.display = 'block';
      if (window.innerWidth <= 768) {
        elements.popUp.style.display = 'none';
        elements.mobileSignOutBtn.style.display = 'flex';
      }
      elements.signOutBtn.onclick = () => signOutUser();
      elements.mobileSignOutBtn.onclick = () => signOutUser();
    } else {
      elements.signInBtn.textContent = 'Sign in';
      elements.mobileSignOutBtn.style.display = 'none';
      elements.signInBtn.onclick = () => signInUser();
    }
  }

  if (elements.getStartedBtn) {
    if (user) {
      elements.getStartedBtn.textContent = 'Explore Our Program';
      elements.getStartedBtn.onclick = () => redirectToUserSkill(user.user);
    } else {
      elements.getStartedBtn.onclick = () => {
        window.location.href = 'sign-up.html';
      };
    }
  }
  if (elements.addSkillBtn) {
    if (user) {
      elements.addSkillBtn.onclick = () => handleAddSkill();
      elements.addSkillForm.addEventListener('submit', handleSaveSkills);
    } else {
      elements.addSkillBtn.onclick = () => {
        alert("Sign In to add a skill");
        window.location.href = 'sign-in.html';
      };
    }
  }
}

// sign in function
function signInUser() {
  window.location.href = 'sign-in.html';
}

// sign out function
function signOutUser() {
  auth.signOut().then(() => {
    sessionStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('userId');
    updateUI(null);
    window.location.href = 'index.html';
  }).catch(() => {
    console.error('Error signing Out:', error.message);
  });
}

function redirectToUserSkill(userId) {
  window.location.href = 'skills.html';
}

function handleAddSkill() {
  const skilPopUp = document.getElementById('js-popup');
  skilPopUp.style.display = 'flex';
}

function handleSaveSkills(e) {
  e.preventDefault();
  const inpselectSkill = document.getElementById('inpselectSkill');
  const inpDescription = document.getElementById('inpDescription');
  const inpselectIcon = document.getElementById('inpselectIcon');
  const skill = inpselectSkill.value.trim();
  const description = inpDescription.value.trim();
  const icon = inpselectIcon.value.trim();
  console.log(skill);
  console.log(description);
  console.log(icon);

  if (!skill || !description || !icon) {
    alert('Please fill all the fields');
    return;
  }

  const skillRef = ref(database, `skills`);
  const newSkillRef = push(skillRef);
  set(newSkillRef, {
    skill,
    description,
    icon
  })
    .then(() => {
      console.log('skill added successfully');
      const addSkillForm = document.getElementById('add-skills-form');
      addSkillForm.reset();
      const skilPopUp = document.getElementById('js-popup');
      skilPopUp.style.display = 'none';
    })
    .catch(error => {
      console.log('Error saving skill' + error.message);
    });
}

function renderSkills() {
  const skillList = document.getElementById('skills-list');
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