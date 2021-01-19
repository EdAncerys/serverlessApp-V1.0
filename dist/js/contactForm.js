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
