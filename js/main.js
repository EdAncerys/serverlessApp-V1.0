document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('freshDeskTickets')
    .addEventListener('click', freshDeskTickets);
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
