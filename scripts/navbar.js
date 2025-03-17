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