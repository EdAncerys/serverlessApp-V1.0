import { _errorMessage } from './helperFunctions/.js.js';
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
  _errorMessage('Login to account', 'success');
};

const oneTouchSignUp = (e) => {
  e.preventDefault();
  _errorMessage('SignUp to account', 'success');
};
