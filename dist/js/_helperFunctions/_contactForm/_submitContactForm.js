import { _handleFormSubmission } from '../_handleFormSubmission.js';
import { _contactFormTemplate } from '../_contactFormTemplate.js';

const _submitContactForm = (name, email, subject, description) => {
  console.log('Sending Email...');
  console.log(name, email, subject, description);

  const URL = '/ndg/contactUs';
  const body = {
    name,
    email,
    subject,
    description: `${_contactFormTemplate(
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
      _handleFormSubmission(name, email, subject, description); // Resets contact form

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

export { _submitContactForm };
