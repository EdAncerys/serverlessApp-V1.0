document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('contactUs').addEventListener('click', contactUs);
});

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
    .then((resp) => resp.json())
    .then((data) => {
      let main = document.querySelector('main');
      main.innerHTML = `<h4>Email Sent</h4>`;

      console.log(data);
      console.log('Done...');
    })
    .catch((err) => {
      let main = document.querySelector('main');
      main.innerHTML = `<h4>${err}</h4>`;
      console.log(err);
    });
}
