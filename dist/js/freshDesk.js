document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('freshDeskTickets')
    .addEventListener('click', freshDeskTickets);
  document
    .getElementById('submitTicket')
    .addEventListener('click', handleFormValidation);
});

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const handleErrors = (errors) => {
  console.log('error...');
  let msg = document.querySelector('msg');
  document.querySelector('#msg').style.display = 'block';
  let errorMsg = errors.map((err) => {
    return `<li class='err'>${err.msg}</li>`;
  });
  msg.innerHTML = `<ul>${errorMsg}</ul>`;
  setTimeout(() => {
    document.querySelector('#msg').style.display = 'none';
  }, 2000);
};

const handleFormValidation = (ev) => {
  ev.preventDefault();
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let subject = document.getElementById('subject').value;
  let description = document.getElementById('description').value;
  let errors = [];

  console.log('Validating From...');
  console.log(name, email, subject, description);

  if (!name || !email || !subject || !description)
    errors.push({ msg: 'Please fill in all fields' });

  if (!validateEmail(email)) errors.push({ msg: 'Email not valid' });

  if (errors.length > 0) {
    handleErrors(errors);
  } else {
    console.log('Form submitted successfully...');
    submitTicket(name, email, subject, description);
  }
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

const submitTicket = (name, email, subject, description) => {
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
