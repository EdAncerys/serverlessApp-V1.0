import { _errorMessage } from './_helperFunctions/_errorMessage.js';

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#oneTouchLogin')
    .addEventListener('click', oneTouchLogin);
});

const oneTouchLogin = (e) => {
  e.preventDefault();
  _errorMessage('Login to account', 'success');
};
