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

  const body = {
    email: 'oneTouchLoginEmail',
    password: 'oneTouchLoginPassword',
  };
  console.log(body);

  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    const data = await response.json();
    if (!response.ok) throw new Error(data.msg);

    console.log(data);
    // sessionStorage.setItem('oneTouchSuperUser', data.user);
    _errorMessage(data.msg, 'success');
  } catch (err) {
    console.log(err);
    _errorMessage(err);
  }
}
