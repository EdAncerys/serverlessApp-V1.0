function _freshDeskTickets() {
  const URL = '/ndg/tickets';
  console.log('Fetching freshDeskTickets...');

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      let length = data.length;
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

export { _freshDeskTickets };
