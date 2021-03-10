import { _errorMessage } from './_helperFunctions/_errorMessage.js';
import { _fetchOneTouchUsersFromDB } from './_helperFunctions/mongoDB/oneTouchManageUsers/_fetchOneTouchUsersFromDB.js';
import { _deleteOneTouchUser } from './_helperFunctions/mongoDB/oneTouchManageUsers/_deleteOneTouchUser.js';

document.addEventListener('DOMContentLoaded', () => {
  // Persist user data on reload
  const oneTouchDOMBody = sessionStorage.getItem('oneTouchDOMBody') === null;
  const oneTouchBodyName =
    sessionStorage.getItem('oneTouchBodyName') === 'manage-users';

  if (oneTouchDOMBody || !oneTouchBodyName) {
    fetchOneTouchUsersFromDB();
  }
  if (!oneTouchDOMBody && oneTouchBodyName) {
    console.log('Page Reloaded');
    const oneTouchDOMBody = document.querySelector('#oneTouchBodyContainer');
    oneTouchDOMBody.innerHTML = sessionStorage.getItem('oneTouchDOMBody');
  }
});

const fetchOneTouchUsersFromDB = () => {
  _fetchOneTouchUsersFromDB('manage-users');
};

document.querySelector('body').addEventListener('click', (event) => {
  const userInfo = event.target.nodeName === 'USERINFO';
  const updateUser = event.target.nodeName === 'UPDATEUSER';
  const deleteUser = event.target.nodeName === 'DELETEUSER';

  let id = event.target.getAttribute('id');

  if (userInfo) {
    console.log(id);
    _errorMessage('Info User Content', 'success');
  }
  if (updateUser) {
    console.log(id);
    _errorMessage('Update User Content', 'warning');
  }
  if (deleteUser) {
    console.log(id);
    _deleteOneTouchUser(id, 'manage-users');
  }
});
