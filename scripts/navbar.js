// click on the menu icon to display the navbar links 
const menuIcon = document.querySelector('#js-menu-icon');
const cancelIcon = document.querySelector('#js-cancel-icon');

menuIcon.addEventListener('click', () => {
  document.querySelector('#js-navbar').style.display = "flex";
  menuIcon.style.display = 'none';
  document.querySelector('#js-navbar').style.animation = 'slideIn 0.3s ease-in-out'; // Reduced animation duration
  document.querySelector('#js-navbar').classList.add('mobile-nav'); // Add class for mobile style
  document.querySelector('.nav-video').style.display = 'none'; // Hide video
  document.querySelector('.shuffle-images').style.display = 'none'; // Hide shuffle images
});

cancelIcon.addEventListener('click', () => {
  document.querySelector('#js-navbar').style.display = "none";
  menuIcon.style.display = 'block';
  document.querySelector('#js-navbar').style.animation = 'slideOut 0.3s ease-in-out'; // Reduced animation duration
  document.querySelector('#js-navbar').classList.remove('mobile-nav'); // Remove class for mobile style
  document.querySelector('.nav-video').style.display = 'block'; // Show video
  document.querySelector('.shuffle-images').style.display = 'flex'; // Show shuffle images
});

document.querySelectorAll('#js-navbar ul li a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('#js-navbar').style.display = "none";
    menuIcon.style.display = 'block';
  });
});

// for a smooth navigation scroll 
// document.querySelector('#product-link').    addEventListener('click', (e) =>{
//   e.preventDefault();

//   document.querySelector('#products').scrollIntoView({
//     behaviour: ''
//   })
// });