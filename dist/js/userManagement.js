import { _getAllUsers } from '../JS/_helperFunctions/mongoDB/getAllUsers.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('getAllUsers').addEventListener('click', getAllUsers);
});

const getAllUsers = (ev) => {
  ev.preventDefault();
  _getAllUsers();
};
