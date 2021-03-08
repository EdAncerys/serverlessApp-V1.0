import { _errorMessage } from './_helperFunctions/_errorMessage.js';
import { _fetchOneTouchUsersFromDB } from './_helperFunctions/mongoDB/oneTouchManageUsers/_fetchOneTouchUsersFromDB.js';
import { _deleteOneTouchUser } from './_helperFunctions/mongoDB/oneTouchManageUsers/_deleteOneTouchUser.js';

document.addEventListener('DOMContentLoaded', () => {
  const oneTouchDOMBody = sessionStorage.getItem('oneTouchDOMBody') === null;
  const oneTouchBodyName =
    sessionStorage.getItem('oneTouchBodyName') === 'manage-users';

  console.log(oneTouchDOMBody, oneTouchBodyName);
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
  _fetchOneTouchUsersFromDB();
};

document.querySelector('body').addEventListener('click', (event) => {
  const btnInfoUser = event.target.nodeName === 'BTNINFOUSER';
  const btnUpdateUser = event.target.nodeName === 'BTNUPDATEUSER';
  const btnDeleteUser = event.target.nodeName === 'BTNDELETEUSER';

  let id = event.target.getAttribute('id');

  if (btnInfoUser) {
    console.log(id);
    _errorMessage(id, 'success');
  }
  if (btnUpdateUser) {
    console.log(id);
    _errorMessage(id, 'warning');
  }
  if (btnDeleteUser) {
    console.log(id);
    _deleteOneTouchUser(id);
  }
});
