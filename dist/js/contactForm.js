import { _handleFormValidation } from './helperFunctions/_handleFormValidation.js';

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('contactUs')
    .addEventListener('click', submitContactForm);
});

const submitContactForm = async (ev) => {
  ev.preventDefault();
  await _handleFormValidation('_submitContactForm');
};
