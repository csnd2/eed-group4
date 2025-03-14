const msgBtn = document.querySelector('#js-send-msg')
msgBtn.addEventListener('click', () => {
  sendMail();
})

function sendMail() {
  const from_name = document.getElementById('from_name').value;
  const email_id = document.getElementById('email_id').value;
  const message = document.getElementById('message').value;

  // Initialize EmailJS with your User ID
  // emailjs.init('8s46LNhuDcL_kfKb_');  

  if (from_name.trim() === '') {
    document.getElementById('name-error').textContent = 'Name cannot be empty';
  } else {
    document.getElementById('name-error').textContent = '';
  }

  if (email_id.trim() === '') {
    document.getElementById('email-error').textContent = 'Email cannot be empty';
  } else {
    document.getElementById('email-error').textContent = '';
  }

  if (message.trim() === '') {
    document.getElementById('message-error').textContent = 'Message cannot be empty';
  } else {
    document.getElementById('message-error').textContent = '';
  }

  if (from_name.trim() !== '' && email_id.trim() !== '' &&  message.trim() !== '') {
    msgBtn.textContent = 'Sending Message...'

    // Proceed with sending the email using EmailJS
    emailjs.send("service_n8ldpt5","template_1lvyggh", {
      from_name: from_name,
      email_id: email_id,
      message, message
    })
    .then(function(response) {
      alert('Message sent successfully!', response.status);
      document.getElementById('contact-form').reset();
      msgBtn.textContent = 'Send Message'
    }, function(error) {  
      console.error('EmailJS Error:', error);  
      alert('An error occurred. Please try again later.');  
      document.getElementById('contact-form').reset();  
      msgBtn.textContent = 'Send Message';  
    })
  }
}