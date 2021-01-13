document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('contactUs')
    .addEventListener('click', handleFormValidation);
});

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
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
  } else {
    console.log('Form submitted successfully...');
    contactUs(name, email, subject, description);
  }
};

const handleSubmission = (name, email, subject, description) => {
  name = '';
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
  }, 2000);
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
  console.log(body);

  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  fetch(URL, config)
    .then((res) => res.json())
    .then((data) => {
      let main = document.querySelector('msg');
      main.innerHTML = `<h4>Thank You Fro Contacting Us <span class='highlightedText'>${body.name}</span></h4>`;
      // Resets form
      handleSubmission(name, email, subject, description);

      console.log(data);
      console.log('Done...');
    })
    .catch((err) => {
      let main = document.querySelector('main');
      main.innerHTML = `<h4>${err}</h4>`;
      console.log(err);
    });
};
