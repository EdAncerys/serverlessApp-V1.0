import { _validateEmail } from '../_validateEmail.js';
import { _submitTicket } from './_submitTicket.js';

const _handleErrors = (errors) => {
  console.log('Validation error...');
  let msg = document.querySelector('msg');
  document.querySelector('#msg').style.display = 'block';
  let errorMsg = errors.map((err) => {
    return `<h4 class='text-danger'>${err.msg}</h4>`;
  });
  msg.innerHTML = `<ul>${errorMsg}</ul>`;
  setTimeout(() => {
    document.querySelector('#msg').style.display = 'none';
  }, 2000);
};

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
