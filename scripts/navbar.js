// click on the menu icon to display the navbar links 
const menuIcon = document.querySelector('#js-menu-icon');
const cancelIcon = document.querySelector('#js-cancel-icon');
menuIcon.addEventListener('click', ()=>{
  document.querySelector('#js-navbar').style.display = "flex";
  cancelIcon.style.marginTop = '20px';
  menuIcon.style.display = 'none';
})

// click on the menu icon to remove the navbar links 
cancelIcon.addEventListener('click', ()=>{
  document.querySelector('#js-navbar').style.display = "none"
  menuIcon.style.display = 'block';

})

// for a smooth navigation scroll 
// document.querySelector('#product-link').    addEventListener('click', (e) =>{
//   e.preventDefault();

//   document.querySelector('#products').scrollIntoView({
//     behaviour: ''
//   })
// });