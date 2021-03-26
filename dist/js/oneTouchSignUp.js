import { _oneTouchSupperUserSignup } from './helperFunctions/mongoDB/oneTouchLogin/_oneTouchSupperUserSignUp.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';
import { _oneTouchUserAuthentication } from './helperFunctions/mongoDB/oneTouchLogin/_oneTouchUserAuthentication.js';

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#oneTouchSignUp')
    .addEventListener('click', oneTouchSignUp);
});

const oneTouchSignUp = (e) => {
  e.preventDefault();
  _oneTouchSupperUserSignup();
};

document.querySelector('body').addEventListener('click', (event) => {
  const oneTouchSignUp = event.target.id === 'oneTouchLogin';

  // console.log(event.target);
  if (oneTouchSignUp) {
    window.location.replace('/views/oneTouch/one-touch-login.html');
    return;
  }
});
