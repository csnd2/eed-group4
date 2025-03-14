const viewBtn = document.querySelector('.js-view-btn');
const abtBtn = document.querySelector('.js-abt');
const reachBtn = document.querySelector('.js-reachUs');

viewBtn.addEventListener('click', () => {
  window.location.href="#ref"
});
abtBtn.addEventListener('click', () => {
  window.location.href="#about"
});
reachBtn.addEventListener('click', () => {
  window.location.href="#contact"
})