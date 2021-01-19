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

const _submitTicket = (name, email, subject, description) => {
  console.log('Submit Ticket To freshDeskTickets...');

  const URL = '/ndg/createTicket';
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

  let msg = document.querySelector('msg');

  fetch(URL, config)
    .then((res) => res.json())
    .then((data) => {
      let msg = document.querySelector('msg');
      msg.innerHTML = `<h4>Thank You <span class='highlightedText'>${body.name}</span></h4><br/>
                      <h4>Ticket been submitted successfully</span></h4>`;
      // Reset values
      handleSubmission();

      console.log(data);
      console.log('Done...');
    })
    .catch((err) => {
      let msg = document.querySelector('msg');
      msg.innerHTML = `<h4>${err}</h4>`;
      console.log(err);
    });
};

export { _submitTicket };
