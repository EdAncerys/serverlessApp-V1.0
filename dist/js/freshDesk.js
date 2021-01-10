document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('freshDeskTickets')
    .addEventListener('click', freshDeskTickets);
  document
    .getElementById('submitTicket')
    .addEventListener('click', submitTicket);
});

function handleTicketSubmit() {
  document.querySelector('#name').value = '';
  document.querySelector('#email').value = '';
  document.querySelector('#subject').value = '';
  document.querySelector('#description').value = '';

  const formContainer = document.querySelector('#formContainer');
  const msgContainer = document.querySelector('#message');
  formContainer.style.display = 'none';
  msgContainer.style.display = 'block';
  setTimeout(() => {
    formContainer.style.display = 'block';
    msgContainer.style.display = 'none';
  }, 2000);
}

function freshDeskTickets(ev) {
  ev.preventDefault();
  const URL = '/ndg/tickets';
  console.log('Fetching freshDeskTickets...');

  fetch(URL)
    .then((resp) => resp.json())
    .then((data) => {
      const length = data.length;
      let main = document.querySelector('main');
      let content = data.slice(0, 4).map((ticket) => {
        return `<li>ID: ${ticket.id}</li>
                <li>Created At: ${ticket.created_at}</li>
                <li>Subject: ${ticket.subject}</li>`;
      });
      main.innerHTML = `<h4>Last 4 tickets out of ${length}</h4>
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
  };

  const config = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  };

  fetch(URL, config)
    .then((resp) => resp.json())
    .then((data) => {
      let main = document.querySelector('main2');
      main.innerHTML = `<h4>Thank You <span class='highlightedText'>${body.name}</span></h4>`;
      // Reset values
      handleTicketSubmit();

      console.log(data);
      console.log('Done...');
    })
    .catch((err) => {
      let main = document.querySelector('main');
      main.innerHTML = `<h4>${err}</h4>`;
      console.log(err);
    });
}
