import { _validateEmail } from './_submitTicket.js';

const _handleFormValidation = (ev) => {
  ev.preventDefault();
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let subject =
    document.getElementById('subject').value +
    ' | Created at: ' +
    new Date().toLocaleString();
  let description = document.getElementById('description').value;

  let errors = [];

  console.log('Validating From...');
  console.log(name, email, subject, description);

  if (!name || !email || !subject || !description)
    errors.push({ msg: 'Please fill in all fields' });

  if (!_validateEmail(email)) errors.push({ msg: 'Email not valid' });

  if (errors.length > 0) {
    handleErrors(errors);
  } else {
    console.log('Form submitted successfully...');
    contactUs(name, email, subject, description);
  }
};

export { _handleFormValidation };
