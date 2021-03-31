import { _oneTouchSupperUserLogin } from './helperFunctions/mongoDB/oneTouchLogin/_oneTouchSupperUserLogin.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';
import { _oneTouchUserAuthentication } from './helperFunctions/mongoDB/oneTouchLogin/_oneTouchUserAuthentication.js';

document.querySelector('body').addEventListener('click', (event) => {
  const oneTouchLogin = event.target.id === 'oneTouchLogin';
  const oneTouchSignUp = event.target.id === 'oneTouchSignUp';

  // console.log(event.target);
  if (oneTouchLogin) {
    _oneTouchSupperUserLogin();
    return;
  }
  if (oneTouchSignUp) {
    window.location.replace('/views/oneTouch/one-touch-signup.html');
    return;
  }
});

document.querySelector('body').addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    _oneTouchSupperUserLogin();
  }
});
