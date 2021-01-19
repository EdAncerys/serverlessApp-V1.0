import { _validateEmail } from '../_validateEmail.js';
import { _submitTicket } from './_submitTicket.js';
import { _handleErrors } from '../_handleErrors.js';

const _handleFormValidation = () => {
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let subject = document.getElementById('subject').value;
  let description = document.getElementById('description').value;
  let errors = [];

  console.log('Validating From...');
  console.log(name, email, subject, description);

  if (!name || !email || !subject || !description)
    errors.push({ msg: 'Please fill in all fields' });

  if (!_validateEmail(email)) errors.push({ msg: 'Email not valid' });

  if (errors.length > 0) {
    _handleErrors(errors);
  } else {
    console.log('Form submitted successfully...');
    _submitTicket(name, email, subject, description);
  }
};

export { _handleFormValidation };
