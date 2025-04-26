// click on the menu icon to display the navbar links 
const menuIcon = document.getElementById('js-menu-icon');
const cancelIcon = document.getElementById('js-cancel-icon');
const nav = document.getElementById('js-navbar');

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

menuIcon.addEventListener('click', () => {
  nav.style.display = 'block';
  nav.classList.add('active');
  menuIcon.style.display = 'none';
  cancelIcon.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
});

cancelIcon.addEventListener('click', () => {
  nav.classList.remove('active');
  menuIcon.style.display = 'block';
  cancelIcon.style.display = 'none';
  document.body.style.overflow = 'auto'; // Re-enable scrolling
  setTimeout(() => {
    nav.style.display = 'none';
  }, 300);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (nav.classList.contains('active') && 
      !nav.contains(e.target) && 
      !menuIcon.contains(e.target)) {
    nav.classList.remove('active');
    menuIcon.style.display = 'block';
    cancelIcon.style.display = 'none';
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      nav.style.display = 'none';
    }, 300);
  }
});

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

// Sign in and sign out functionality
document.addEventListener('DOMContentLoaded', () => {
  const signInMobileBtn = document.getElementById('js-sign-in-mobile');
  const signOutMobileBtn = document.getElementById('js-sign-out-mobile');
  const signInBtn = document.getElementById('js-sign-in');
  const signOutBtn = document.getElementById('js-sign-out');
  const profilePopup = document.getElementById('js-popped-up');
  const nav = document.getElementById('js-navbar');

  // Handle sign in button clicks
  if (signInMobileBtn) {
    signInMobileBtn.addEventListener('click', () => {
      closeNavAndNavigate('sign-in.html');
    });
  }

  if (signInBtn) {
    signInBtn.addEventListener('click', () => {
      closeNavAndNavigate('sign-in.html');
    });
  }

  // Handle sign out functionality
  const handleSignOut = () => {
    // Clear any user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
    
    // Hide user profile elements
    if (profilePopup) {
      profilePopup.style.display = 'none';
    }
    
    // Show sign in button, hide sign out button
    if (signInBtn) signInBtn.style.display = 'block';
    if (signInMobileBtn) signInMobileBtn.style.display = 'block';
    if (signOutMobileBtn) signOutMobileBtn.style.display = 'none';
    
    // Close mobile menu after sign out
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
      menuIcon.style.display = 'block';
      cancelIcon.style.display = 'none';
      document.body.style.overflow = 'auto';
      setTimeout(() => {
        nav.style.display = 'none';
      }, 300);
    }
    
    // Redirect to home page
    window.location.href = 'index.html';
  };

  // Attach sign out handlers
  if (signOutMobileBtn) {
    signOutMobileBtn.addEventListener('click', handleSignOut);
  }

  if (signOutBtn) {
    signOutBtn.addEventListener('click', handleSignOut);
  }

  // Check auth state on page load
  const checkAuthState = () => {
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
  };

  // Check auth state when page loads
  checkAuthState();
});