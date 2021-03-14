import { _oneTouchSupperUserSignup } from './helperFunctions/mongoDB/oneTouchLogin/_oneTouchSupperUserSignUp.js';
import { _oneTouchSupperUserLogin } from './helperFunctions/mongoDB/oneTouchLogin/_oneTouchSupperUserLogin.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#oneTouchLogin')
    .addEventListener('click', oneTouchLogin);

  document
    .querySelector('#oneTouchSignUp')
    .addEventListener('click', oneTouchSignUp);

  document
    .querySelector('userAuthentication')
    .addEventListener('click', userAuthentication);
});

const oneTouchLogin = (e) => {
  e.preventDefault();
  _oneTouchSupperUserLogin();
};

const oneTouchSignUp = (e) => {
  e.preventDefault();
  _oneTouchSupperUserSignup();
};

async function userAuthentication(e) {
  e.preventDefault();
  console.log('userAuthentication');

  const URL = '/oneTouch/oneTouchUserAuthentication';
  const access_token = sessionStorage.getItem('access_token');

  const body = {
    access_token,
  };
  console.log(body);

  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    const data = await response.json();
    if (!response.ok)
      throw new Error(`You need to be logged! ${data.access_token.name}`);

    console.log(data);
    _errorMessage(`Logged in user: ${data.access_token.email}`, 'success');
  } catch (err) {
    console.log(err);
    _errorMessage(err, 'error');
  }
}
