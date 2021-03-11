import { _errorMessage } from './_errorMessage.js';

const _handleErrors = (errors) => {
  errors.map((err) => {
    _errorMessage(err.msg, 'error');
  });
};

export { _handleErrors };
