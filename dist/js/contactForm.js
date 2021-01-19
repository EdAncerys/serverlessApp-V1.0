import { _contactFormTemplate } from './_helperFunctions/_contactFormTemplate.js';
import { _handleFormValidation } from './_helperFunctions/_contactForm/_handleFormValidation.js';

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('contactUs')
    .addEventListener('click', submitContactForm);
});

const submitContactForm = (ev) => {
  ev.preventDefault();
  _handleFormValidation();
};

const handleSubmission = () => {
  document.querySelector('#name').value = '';
  document.querySelector('#email').value = '';
  document.querySelector('#subject').value = '';
  document.querySelector('#description').value = '';

  const formContainer = document.querySelector('#form');
  const msgContainer = document.querySelector('#msg');
  formContainer.style.display = 'none';
  msgContainer.style.display = 'block';
  setTimeout(() => {
    formContainer.style.display = 'block';
    msgContainer.style.display = 'none';
  }, 3000);
};

const contactUs = (name, email, subject, description) => {
  console.log('Sending Email...');

  const URL = '/ndg/contactUs';
  const body = {
    name,
    email,
    subject,
    description: `${_contactFormDescriptionHTML(
      'Customer Contact Form',
      name,
      email,
      subject,
      description
    )}`,
  };

  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  fetch(URL, config)
    .then((res) => res.json())
    .then((data) => {
      let msg = document.querySelector('msg');
      msg.innerHTML = `<h4>Thank You For Contacting Us <span class='highlightedText'>${body.name}</span></h4>`;
      // Resets form
      handleSubmission(name, email, subject, description);

      console.log(data);
      console.log('Data submitted successfully...');
    })
    .catch((err) => {
      let msg = document.querySelector('msg');
      msg.innerHTML = `<h4>${err}</h4>`;

      console.log('error');
      console.log(err);
    });
};
