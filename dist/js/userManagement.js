import { _oneTouchUsers } from '../JS/_helperFunctions/mongoDB/_oneTouchUsers.js';
import { _errorMessage } from './_helperFunctions/_errorMessage.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('getAllUsers').addEventListener('click', getAllUsers);
  document
    .getElementById('createOneTouchAccount')
    .addEventListener('click', createOneTouchAccount);
});

const getAllUsers = (ev) => {
  ev.preventDefault();
  _oneTouchUsers();
};

const createOneTouchAccount = (ev) => {
  ev.preventDefault();
  _errorMessage('Form Not active yet...', 'warning');
};
