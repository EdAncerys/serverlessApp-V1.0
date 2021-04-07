import { _oneTouchCustomer } from './_oneTouchCustomer.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _oneTouchUserLogin() {
  _spinner(true);
  let email = document.getElementById('userEmail').value;
  let password = document.getElementById('userPassword').value;
  console.log('Attempting user login. email: ' + email);

  const URL = '/oneTouch/login';
  const body = {
    email,
    password,
  };
  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  fetch(URL, config)
    .then((res) => res.json())
    .then((data) => {
      _spinner(false);
      if (data.statusCode === 404) {
        _errorMessage(data.msg);
      } else {
        _errorMessage(data.msg, 'success');
      }

      console.log(data);
    })
    .catch((err) => {
      _spinner(false);
      _errorMessage(err.msg);

      console.log(err);
    });
}

export { _oneTouchUserLogin };
