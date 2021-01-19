import { _validateEmail } from './_validateEmail.js';
import { _handleErrors } from './_handleErrors.js';
import { _submitContactForm } from './_contactForm/_submitContactForm.js';
import { _submitTicket } from './_freshDesk/_submitTicket.js';

const _handleFormValidation = (formType) => {
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
    _handleErrors(errors);
  } else {
    console.log('Form submitted successfully...');
    if (formType === '_submitContactForm') {
      _submitContactForm(name, email, subject, description);
    } else if (formType === '_submitTicket') {
      _submitTicket(name, email, subject, description);
    } else {
      console.log('Error submitting form...');
    }
  }
};

export { _handleFormValidation };
