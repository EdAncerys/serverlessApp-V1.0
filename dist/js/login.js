import { _oneTouchUserLogin } from './_helperFunctions/mongoDB/_oneTouchUserLogin.js';

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelector('#oneTouchUserLogin')
    .addEventListener('click', oneTouchUserLogin);
});

const oneTouchUserLogin = (e) => {
  e.preventDefault();
  _oneTouchUserLogin();
};
