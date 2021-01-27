import { _errorMessage } from './_errorMessage.js';

const _handleErrors = (errors) => {
  console.log('Form validation error...');
  let errorMessage = document.querySelector('errorMessage');

  let message = errors.map((err) => {
    return _errorMessage(err.msg);
  });

  errorMessage.innerHTML = message;
};

export { _handleErrors };
