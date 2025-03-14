const faqQuestions = document.querySelectorAll('.faq-question');  

faqQuestions.forEach(question => {  
  question.addEventListener('click', () => {  
    const answer = question.nextElementSibling;  
    answer.classList.toggle('active'); 
  });  
}); 