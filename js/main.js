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
      console.log(data[0]);
      console.log('Done...Total: ' + length);
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
    // Authorization: 'Basic bzZVQnJHZWVYR3VBTHJtZVJ0UE06WA==',
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
