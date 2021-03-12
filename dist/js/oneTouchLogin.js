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
});

const oneTouchLogin = (e) => {
  e.preventDefault();
  _oneTouchSupperUserLogin();
};

const oneTouchSignUp = (e) => {
  e.preventDefault();
  _oneTouchSupperUserSignup();
};
