const closeIcon = document.getElementById('js-close-icon')
const skilPopUp = document.getElementById('js-popup');
const addSkillForm = document.getElementById('add-skills-form');
const inpselectSkill = document.getElementById('skill-select');
const inpDescription = document.getElementById('description-inp');
const inpselectIcon = document.getElementById('icon-select');

let selectedIcon = null

closeIcon.addEventListener('click', handleCloseSkill)

function handleCloseSkill() {
  skilPopUp.style.display = 'none'
}

// Reduce all feature cards' width to 60px dynamically
const adjustFeatureCardWidth = () => {
  const allCards = document.querySelectorAll('.features-cards > div');
  allCards.forEach(card => {
    card.style.width = '60px';
  });
};

// Ensure dynamically added skill cards align vertically in mobile view
const adjustFeatureCardLayout = () => {
  const allCards = document.querySelectorAll('.features-cards > div');
  if (window.innerWidth <= 768) {
    allCards.forEach(card => {
      card.style.width = '90%';
      card.style.marginBottom = '20px';
    });
  } else {
    allCards.forEach(card => {
      card.style.width = '';
      card.style.marginBottom = '';
    });
  }
};

// Ensure all feature cards maintain consistent sizing and layout
const adjustFeatureCards = () => {
  const cards = document.querySelectorAll('.features-cards > div');
  cards.forEach(card => {
    // Set consistent base styles
    card.style.flex = '1';
    card.style.minWidth = '300px';
    card.style.maxWidth = '380px';
    card.style.margin = '10px';
    card.style.boxSizing = 'border-box';
    
    // Ensure content is properly contained
    const cardContent = card.querySelector('p');
    if (cardContent) {
      cardContent.style.width = '100%';
      cardContent.style.margin = '0';
    }
  });
};

window.addEventListener('resize', () => {
  adjustFeatureCardLayout();
  adjustFeatureCards();
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.zoom = '100%';
  adjustFeatureCardWidth();
  adjustFeatureCardLayout();
  adjustFeatureCards();
});

// Ensure dynamically added skills respect the layout and sizes
document.getElementById('js-add-skill').addEventListener('click', () => {
  const skillsList = document.getElementById('skills-list');
  const newSkill = document.createElement('div');
  newSkill.className = 'card1';
  newSkill.innerHTML = `
    <div class="icon-div" style="background-color: rgb(59, 3, 50);">
      <i class="fa-solid fa-star" style="color: yellow;"></i>
    </div>
    <h3 style="color: rgb(150, 150, 19);">New Skill</h3>
    <p style="color: aliceblue;">Description of the new skill added dynamically.</p>
  `;
  skillsList.appendChild(newSkill);
  adjustFeatureCards();
});

