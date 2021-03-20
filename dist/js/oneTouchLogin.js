import { _oneTouchSupperUserSignup } from './helperFunctions/mongoDB/oneTouchLogin/_oneTouchSupperUserSignUp.js';
import { _oneTouchSupperUserLogin } from './helperFunctions/mongoDB/oneTouchLogin/_oneTouchSupperUserLogin.js';
import { oneTouchUserAuthentication } from './oneTouchUserAuthentication.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#oneTouchLogin')
    .addEventListener('click', oneTouchLogin);

  document
    .querySelector('#oneTouchSignUp')
    .addEventListener('click', oneTouchSignUp);

  document
    .querySelector('authenticateUser')
    .addEventListener('click', authenticateUser);
});

const oneTouchLogin = (e) => {
  e.preventDefault();
  _oneTouchSupperUserLogin();
};

const oneTouchSignUp = (e) => {
  e.preventDefault();
  _oneTouchSupperUserSignup();
};

async function authenticateUser(e) {
  e.preventDefault();
  const authenticated = await oneTouchUserAuthentication();
  console.log(authenticated);
  if (authenticated) {
    console.log('Authorized');
  } else {
    console.log('Unauthorized access');
    // window.location.replace('/views/oneTouch/one-touch-login.html');
  }
}
