document.addEventListener('DOMContentLoaded', () => {
  document.body.style.zoom = '100%';
});

const faqQuestions = document.querySelectorAll('.faq-question');  

faqQuestions.forEach(question => {  
  question.addEventListener('click', () => {  
    const answer = question.nextElementSibling;  
    answer.classList.toggle('active'); 
  });  
});