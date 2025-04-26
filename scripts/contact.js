const msgBtn = document.querySelector('#js-send-msg');
msgBtn.addEventListener('click', () => {
  sendMail();
});

function sendMail() {
  const from_name = document.getElementById('from_name').value;
  const email_id = document.getElementById('email_id').value;
  const message = document.getElementById('message').value;

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

  if (from_name.trim() !== '' && email_id.trim() !== '' && message.trim() !== '') {
    msgBtn.textContent = 'Sending Message...';

    // Simulate email sending for consistency with about.html
    setTimeout(() => {
      alert('Message sent successfully!');
      document.getElementById('contact-form').reset();
      msgBtn.textContent = 'Send Message';
    }, 2000);
  }
}