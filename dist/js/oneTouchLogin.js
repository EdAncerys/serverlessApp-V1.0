import { _oneTouchSupperUserLogin } from './helperFunctions/mongoDB/oneTouchLogin/_oneTouchSupperUserLogin.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';
import { _oneTouchUserAuthentication } from './helperFunctions/mongoDB/oneTouchLogin/_oneTouchUserAuthentication.js';

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#oneTouchLogin')
    .addEventListener('click', oneTouchLogin);

  document
    .querySelector('authenticateUser')
    .addEventListener('click', authenticateUser);
});

const oneTouchLogin = (e) => {
  e.preventDefault();
  _oneTouchSupperUserLogin();
};

document.querySelector('body').addEventListener('click', (event) => {
  const oneTouchSignUp = event.target.id === 'oneTouchSignUp';

  // console.log(event.target);
  if (oneTouchSignUp) {
    window.location.replace('/views/oneTouch/one-touch-signup.html');
    return;
  }
});

async function authenticateUser(e) {
  e.preventDefault();
  const authenticated = await _oneTouchUserAuthentication();
  console.log(authenticated);
  if (authenticated) {
    console.log('Authorized');
  } else {
    console.log('Unauthorized access');
    // window.location.replace('/views/oneTouch/one-touch-login.html');
  }
}
