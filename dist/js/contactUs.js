document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('contactUs').addEventListener('click', contactUs);
});

function handleEmailSubmit() {
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

function contactUs(ev) {
  ev.preventDefault();
  console.log('Sending Email...');

  const URL = '/ndg/contactUs';
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const description = document.getElementById('description').value;

  const body = {
    name: name,
    email: email,
    subject: subject,
    description: description,
  };
  console.log(body);

  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  fetch(URL, config)
    .then((res) => res.json())
    .then((data) => {
      let main = document.querySelector('main');
      main.innerHTML = `<h4>Thank You Fro Contacting Us <span class='highlightedText'>${body.name}</span></h4>`;
      // Resets form
      handleEmailSubmit();

      console.log(data);
      console.log('Done...');
    })
    .catch((err) => {
      let main = document.querySelector('main');
      main.innerHTML = `<h4>${err}</h4>`;
      console.log(err);
    });
}
