document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('freshDeskTickets')
    .addEventListener('click', freshDeskTickets);
  document
    .getElementById('submitTicket')
    .addEventListener('click', submitTicket);
});

function freshDeskTickets(ev) {
  ev.preventDefault();
  const URL = '/ndg/tickets';
  console.log('Fetching freshDeskTickets...');
  fetch(URL)
    .then((resp) => resp.json())
    .then((data) => {
      let main = document.querySelector('main');
      let content = data.map((ticket) => {
        return `<li>ID: ${ticket.requester_id}</li>
                <li>Created At: ${ticket.created_at}</li>
                <li>Subject: ${ticket.subject}</li>
                <li>Type: ${ticket.type}</li>`;
      });
      main.innerHTML = `<ul>${content}</ul>`;
      console.log('Done...');
    })
    .catch((err) => {
      let main = document.querySelector('main');
      main.innerHTML = `<h4>${err}</h4>`;
      console.log(err);
    });
}

function submitTicket(ev) {
  ev.preventDefault();
  console.log('Submit Ticket To freshDeskTickets...');

  const URL = '/ndg/createTicket';
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const description = document.getElementById('description').value;

  const body = {
    name: name,
    email: email,
    subject: subject,
    description: description,
    status: 2,
    priority: 1,
  };
  console.log(body);

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Basic bzZVQnJHZWVYR3VBTHJtZVJ0UE06WA==',
  };

  const config = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  };

  fetch(URL, config)
    .then((resp) => resp.json())
    .then((data) => {
      let main = document.querySelector('main');
      // const body = JSON.parse(data);
      main.innerHTML = `<h4>${data.description}</h4>`;
      console.log(data);
      console.log('Done...');
    })
    .catch((err) => {
      let main = document.querySelector('main');
      main.innerHTML = `<h4>${err}</h4>`;
      console.log(err);
    });
}
