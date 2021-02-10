import { _oneTouchUsers } from '../JS/_helperFunctions/mongoDB/_oneTouchUsers.js';

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
  console.log('createOneTouchAccount');
};
