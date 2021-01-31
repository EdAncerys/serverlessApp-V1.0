import { _oneTouchUsers } from '../JS/_helperFunctions/mongoDB/oneTouchUsers.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('getAllUsers').addEventListener('click', getAllUsers);
});

const getAllUsers = (ev) => {
  ev.preventDefault();
  _oneTouchUsers();
};
