document.addEventListener('DOMContentLoaded', () => {
  // Set optimal zoom level
  document.body.style.zoom = '100%';
  
  // Optimize image loading
  const images = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.onload = () => img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.1
  });

  images.forEach(img => {
    imageObserver.observe(img);
  });

  // Filter functionality
  const filterImgs = document.querySelectorAll('.js-filter-img');
  const filterItems = document.querySelector('.js-filter-links');

  if (filterItems) {
    filterItems.addEventListener('click', (selectedItem) => {
      if (selectedItem.target.classList.contains('link')) {
        document.querySelector('.activebtn').classList.remove('activebtn');
        selectedItem.target.classList.add('activebtn');
        
        const filterName = selectedItem.target.getAttribute('data-name');
        filterImgs.forEach(img => {
          const imgFilter = img.getAttribute('data-name');
          const shouldDisplay = imgFilter === filterName || filterName === 'all';
          
          // Use opacity for smoother transitions
          if (shouldDisplay) {
            img.style.display = 'block';
            setTimeout(() => img.style.opacity = '1', 0);
          } else {
            img.style.opacity = '0';
            setTimeout(() => img.style.display = 'none', 300);
          }
        });
      }
    });
  }
});