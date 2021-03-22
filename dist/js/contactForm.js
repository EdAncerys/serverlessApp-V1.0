import { authenticateUser } from './authenticateUser.js';
import { _handleFormValidation } from './helperFunctions/_handleFormValidation.js';

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('contactUs')
    .addEventListener('click', submitContactForm);
});

const submitContactForm = async (ev) => {
  ev.preventDefault();
  await authenticateUser();

  _handleFormValidation('_submitContactForm');
};
