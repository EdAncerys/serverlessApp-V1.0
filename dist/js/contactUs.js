import * as htmlDes from './_helperFunctions/_contactFormDescriptionHTML.js';

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('contactUs')
    .addEventListener('click', handleFormValidation);
  htmlDes._contactFormDescriptionHTML('name');
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
  let subject =
    document.getElementById('subject').value +
    ' | Created at: ' +
    new Date().toLocaleString();
  let customerDescription = document.getElementById('description').value;

  let description = ` <div style="padding: 30px">
  <table>
    <tr style="padding: 5px">
      <th
        colspan="2"
        style="
          color: #d5dde5;
          background: #1b1e24;
          border-bottom: 4px solid #9ea7af;
          border-right: 1px solid #343a45;
          font-size: 24px;
          font-weight: 400;
          padding: 20px;
          text-align: left;
          text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
          vertical-align: middle;
        "
      >
        Customer Contact Form
      </th>
    </tr>

    <tr style="padding: 5px">
      <th
        style="
          border: 1px solid #c1c3d1;
          color: #666b85;
          font-size: 16px;
          font-weight: normal;
          padding: 20px;
          text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
        "
      >
        Customer Name
      </th>
      <th
        style="
          border: 1px solid #c1c3d1;
          color: #666b85;
          font-size: 16px;
          font-weight: normal;
          padding: 20px;
          text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
        "
      >
        Customer Name Customer Name Customer Name Customer Name
      </th>
    </tr>
  </table>
</div>`;

  let errors = [];

  console.log('Validating From...');
  console.log(name, email, subject, customerDescription);

  if (!name || !email || !subject || !description)
    errors.push({ msg: 'Please fill in all fields' });

  if (!validateEmail(email)) errors.push({ msg: 'Email not valid' });

  if (errors.length > 0) {
    handleErrors(errors);
  } else {
    console.log('Form submitted successfully...');
    _contactFormDescriptionHTML('name', 'subject');
    // contactUs(name, email, subject, description);
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

const contactUs = (name, email, subject, description) => {
  console.log('Sending Email...');

  const URL = '/ndg/contactUs';
  const body = {
    name,
    email,
    subject,
    description,
  };

  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  fetch(URL, config)
    .then((res) => res.json())
    .then((data) => {
      let msg = document.querySelector('msg');
      msg.innerHTML = `<h4>Thank You Fro Contacting Us <span class='highlightedText'>${body.name}</span></h4>`;
      // Resets form
      handleSubmission(name, email, subject, description);

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
