const msgBtn = document.querySelector('#js-send-msg');
msgBtn.addEventListener('click', () => {
  const loader = document.querySelector('.loader-container');
  loader.style.display = 'flex';
  sendMessage();
});

function sendMessage() {
  const from_name = document.getElementById('from_name').value;
  const phone_number = document.getElementById('phone_number').value;
  const message = document.getElementById('message').value;
  let hasError = false;

  if (from_name.trim() === '') {
    document.getElementById('name-error').textContent = 'Name cannot be empty';
    hasError = true;
  } else {
    document.getElementById('name-error').textContent = '';
  }

  if (!isValidPhoneNumber(phone_number)) {
    document.getElementById('phone-error').textContent = 'Please enter a valid phone number';
    hasError = true;
  } else {
    document.getElementById('phone-error').textContent = '';
  }

  if (message.trim() === '') {
    document.getElementById('message-error').textContent = 'Message cannot be empty';
    hasError = true;
  } else {
    document.getElementById('message-error').textContent = '';
  }

  if (!hasError) {
    // Format the message for WhatsApp with proper line breaks and structure
    const formattedMessage = `Name: ${from_name}%0A
Phone: ${phone_number}%0A
Message: ${message}`;
    
    // Create WhatsApp URL with the properly encoded message
    const whatsappUrl = `https://wa.me/2349162919586?text=${encodeURIComponent(formattedMessage)}`;
    
    // Show loader for 3 seconds before redirecting
    setTimeout(() => {
      const loader = document.querySelector('.loader-container');
      loader.classList.add('loader-hidden');
      
      setTimeout(() => {
        loader.style.display = 'none';
        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');
        // Reset the form
        document.getElementById('contact-form').reset();
        msgBtn.textContent = 'Send Message';
      }, 500);
    }, 3000);
  } else {
    // Hide loader if there are errors
    const loader = document.querySelector('.loader-container');
    loader.style.display = 'none';
  }
}

function isValidPhoneNumber(phone) {
  // Remove any non-digit characters except +
  const cleanPhone = phone.trim();
  // Check if it matches basic phone number format (allows + and 10-15 digits)
  return /^[+]?\d{10,15}$/.test(cleanPhone);
}