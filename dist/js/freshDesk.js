import { _handleFormValidation } from './_helperFunctions/_freshDesk/_formValidation.js';

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('freshDeskTickets')
    .addEventListener('click', freshDeskTickets);
  document
    .getElementById('submitTicket')
    .addEventListener('click', submitFreshDeskTicket);
});

const submitFreshDeskTicket = (ev) => {
  ev.preventDefault();
  _handleFormValidation();
};

const handleSubmission = () => {
  document.querySelector('#name').value = '';
  document.querySelector('#email').value = '';
  document.querySelector('#subject').value = '';
  document.querySelector('#description').value = '';

  const formContainer = document.querySelector('#form');
  const msgContainer = document.querySelector('#msg');
  formContainer.style.display = 'none';
  msgContainer.style.display = 'block';
  setTimeout(() => {
    formContainer.style.display = 'block';
    msgContainer.style.display = 'none';
  }, 3000);
};

function freshDeskTickets(ev) {
  ev.preventDefault();
  const URL = '/ndg/tickets';
  console.log('Fetching freshDeskTickets...');

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      const length = data.length;
      let msg = document.querySelector('freshDeskMsg');
      let content = data.slice(0, 4).map((ticket) => {
        return `<li>ID: ${ticket.id}</li>
                <li>Created At: ${ticket.created_at}</li>
                <li>Subject: ${ticket.subject}</li>`;
      });
      msg.innerHTML = `<h4>Last 4 tickets out of ${length}</h4>
                        <br/>
                        <ul>${content}</ul>`;

      console.log('Done...Total: ' + length);
      console.log(data);
    })
    .catch((err) => {
      let main = document.querySelector('main');
      main.innerHTML = `<h4>${err}</h4>`;
      console.log(err);
    });
}
