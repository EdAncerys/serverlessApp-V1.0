import { _handleFormValidation } from './helperFunctions/_handleFormValidation.js';

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('contactUs')
    .addEventListener('click', submitContactForm);
});

const submitContactForm = (ev) => {
  ev.preventDefault();
  _handleFormValidation('_submitContactForm');
};
