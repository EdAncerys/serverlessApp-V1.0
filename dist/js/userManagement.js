import { _oneTouchUsers } from '../JS/_helperFunctions/mongoDB/_oneTouchUsers.js';
import { _createOneTouchUser } from '../JS/_helperFunctions/mongoDB/_createOneTouchUser.js';
import { _errorMessage } from './_helperFunctions/_errorMessage.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('getAllUsers').addEventListener('click', getAllUsers);
  document
    .getElementById('createOneTouchAccount')
    .addEventListener('click', createOneTouchUser);
});

const getAllUsers = (ev) => {
  ev.preventDefault();
  _oneTouchUsers();
};

const createOneTouchUser = (ev) => {
  ev.preventDefault();
  _createOneTouchUser();
};
