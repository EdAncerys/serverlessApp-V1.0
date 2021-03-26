import { _handleFormSubmission } from '../_handleFormSubmission.js';
import { _successMessage } from '../_successMessage.js';

const _submitTicket = (name, email, subject, description) => {
  console.log('Submit Ticket To freshDeskTickets...');

  const URL = '/ndg/createTicket';
  const body = {
    name: name,
    email: email,
    subject: subject,
    description: description,
  };
  console.log(body);

  const headers = {
    'Content-Type': 'application/json',
  };

  const config = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  };

  let msg = document.querySelector('msg');

  fetch(URL, config)
    .then((res) => res.json())
    .then((data) => {
      msg.innerHTML = _successMessage(
        body.name,
        'Ticket Been Successfully Submitted...'
      );
      _handleFormSubmission(); // Resets contact form

      console.log(data);
      console.log('Done...');
    })
    .catch((err) => {
      msg.innerHTML = `<h4>${err}</h4>`;
      console.log(err);
    });
};

export { _submitTicket };
