import { _errorMessage } from './helperFunctions/_errorMessage.js';
import { _fetchOneTouchCustomerFromDB } from './helperFunctions/mongoDB/oneTouchManageCustomer/_fetchOneTouchCustomerFromDB.js';
import { _deleteOneTouchCustomer } from './helperFunctions/mongoDB/oneTouchManageCustomer/_deleteOneTouchCustomer.js';

document.addEventListener('DOMContentLoaded', () => {
  // Persist user data on reload
  const oneTouchDOMBody = sessionStorage.getItem('oneTouchDOMBody') === null;
  const oneTouchBodyName =
    sessionStorage.getItem('oneTouchBodyName') === 'manage-customers';

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
  _fetchOneTouchCustomerFromDB('manage-customers');
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
    _deleteOneTouchCustomer(id, 'manage-customers');
  }
});
