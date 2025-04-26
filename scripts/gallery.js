let filterImgs = document.querySelectorAll('.js-filter-img');
let filterItems = document.querySelector('.js-filter-links');

document.addEventListener('DOMContentLoaded', () => {
  document.body.style.zoom = '100%';
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.loading = 'lazy';
  });
});

window.addEventListener('load', () => {
  filterItems.addEventListener('click', (selectedItem) => {
    if(selectedItem.target.classList.contains('link')){
      document.querySelector('.activebtn').classList.remove('activebtn');
      selectedItem.target.classList.add('activebtn');
      let filterNames = selectedItem.target.getAttribute('data-name');
      filterImgs.forEach(img => {
        let filterImgs = img.getAttribute('data-name');

        if((filterImgs == filterNames) || filterNames == 'all'){
          img.style.display='block';
        }else{
          img.style.display= 'none';
        };
      });
    };
  });
});