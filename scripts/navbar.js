// click on the menu icon to display the navbar links 
const menuIcon = document.getElementById('js-menu-icon');
const cancelIcon = document.getElementById('js-cancel-icon');
const nav = document.getElementById('js-navbar');
const signInMobileBtn = document.getElementById('js-sign-in-mobile');
const signOutMobileBtn = document.getElementById('js-sign-out-mobile');
const signInBtn = document.getElementById('js-sign-in');
const signOutBtn = document.getElementById('js-sign-out');
const profilePopup = document.getElementById('js-popped-up');

// Open mobile menu
menuIcon.addEventListener('click', () => {
  nav.style.display = 'flex';
  requestAnimationFrame(() => {
    nav.classList.add('active');
    menuIcon.style.display = 'none';
    cancelIcon.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
});

// Close mobile menu
cancelIcon.addEventListener('click', () => {
  nav.classList.remove('active');
  menuIcon.style.display = 'block';
  cancelIcon.style.display = 'none';
  document.body.style.overflow = 'auto';
  
  nav.addEventListener('transitionend', function hideNav() {
    nav.style.display = 'none';
    nav.removeEventListener('transitionend', hideNav);
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (nav.classList.contains('active') && 
      !nav.contains(e.target) && 
      !menuIcon.contains(e.target) && 
      !cancelIcon.contains(e.target)) {
    nav.classList.remove('active');
    menuIcon.style.display = 'block';
    cancelIcon.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    nav.addEventListener('transitionend', function hideNav() {
      nav.style.display = 'none';
      nav.removeEventListener('transitionend', hideNav);
    });
  }
});

// Function to close nav and navigate
function closeNavAndNavigate(path) {
  nav.classList.remove('active');
  menuIcon.style.display = 'block';
  cancelIcon.style.display = 'none';
  document.body.style.overflow = 'auto';
  setTimeout(() => {
    nav.style.display = 'none';
    window.location.href = path;
  }, 300);
}

// set the browser zoom level to 100% on page load
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.zoom = '100%';
});

// Adjust the body width to remove surplus white space on the right
const adjustBodyWidth = () => {
  document.body.style.overflowX = 'hidden';
};

document.addEventListener('DOMContentLoaded', adjustBodyWidth);

// Store user login info for autocomplete
function storeUserInfo(email) {
  localStorage.setItem('lastLoginEmail', email);
}

function getStoredUserInfo() {
  return localStorage.getItem('lastLoginEmail');
}

// Check authentication state and update UI
document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in
  const user = localStorage.getItem('user');
  const userToken = localStorage.getItem('userToken');
  const lastLoginEmail = getStoredUserInfo();
  
  if (user && userToken) {
    // User is logged in
    if (profilePopup) profilePopup.style.display = 'flex';
    if (signInBtn) signInBtn.style.display = 'none';
    if (signInMobileBtn) signInMobileBtn.style.display = 'none';
    if (signOutMobileBtn) signOutMobileBtn.style.display = 'block';
  } else {
    // User is logged out
    if (profilePopup) profilePopup.style.display = 'none';
    if (signInBtn) signInBtn.style.display = 'block';
    if (signInMobileBtn) signInMobileBtn.style.display = 'block';
    if (signOutMobileBtn) signOutMobileBtn.style.display = 'none';

    // Set autocomplete if available
    if (lastLoginEmail && window.location.pathname.includes('sign-in.html')) {
      const emailInput = document.querySelector('input[type="email"]');
      if (emailInput) {
        emailInput.value = lastLoginEmail;
      }
    }
  }

  // Handle sign in/out button clicks
  if (signInMobileBtn) {
    signInMobileBtn.addEventListener('click', () => {
      closeNavAndNavigate('sign-in.html');
    });
  }

  if (signOutMobileBtn) {
    signOutMobileBtn.addEventListener('click', () => {
      // Clear user data
      localStorage.removeItem('user');
      localStorage.removeItem('userToken');
      
      // Update UI
      if (profilePopup) profilePopup.style.display = 'none';
      if (signInBtn) signInBtn.style.display = 'block';
      if (signInMobileBtn) signInMobileBtn.style.display = 'block';
      if (signOutMobileBtn) signOutMobileBtn.style.display = 'none';
      
      // Close mobile menu
      nav.classList.remove('active');
      menuIcon.style.display = 'block';
      cancelIcon.style.display = 'none';
      document.body.style.overflow = 'auto';
      nav.style.display = 'none';
      
      // Redirect to home
      window.location.href = 'index.html';
    });
  }
});