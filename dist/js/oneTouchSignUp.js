import { _oneTouchSuperUserSignup } from './helperFunctions/mongoDB/oneTouchLogin/_oneTouchSuperUserSignUp.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#oneTouchSignUp')
    .addEventListener('click', oneTouchSignUp);
});

const oneTouchSignUp = (e) => {
  e.preventDefault();
  _oneTouchSuperUserSignup();
};

document.querySelector('body').addEventListener('click', (event) => {
  const oneTouchSignUp = event.target.id === 'oneTouchLogin';
  const termsAndConditions = event.target.nodeName === 'TERMSANDCONDITIONS';

  // console.log(event.target);
  if (termsAndConditions) {
    _errorMessage('Terms & Conditions', 'warning');
    return;
  }
  if (oneTouchSignUp) {
    window.location.replace('/index.html');
    return;
  }
});
