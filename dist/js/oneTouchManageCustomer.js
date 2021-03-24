import { authenticateUser } from './authenticateUser.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';
import { _fetchAllOneTouchCustomers } from './helperFunctions/mongoDB/oneTouchManageCustomer/_fetchAllOneTouchCustomers.js';
import { _deleteOneTouchCustomer } from './helperFunctions/mongoDB/oneTouchManageCustomer/_deleteOneTouchCustomer.js';

document.addEventListener('DOMContentLoaded', () => {
  // Persist user data on reload
  const oneTouchDOMBody = sessionStorage.getItem('oneTouchDOMBody') === null;
  const oneTouchPageName =
    sessionStorage.getItem('oneTouchPageName') === 'manage-customers';

  if (oneTouchDOMBody || !oneTouchPageName) {
    fetchOneTouchUsersFromDB();
  }
  if (!oneTouchDOMBody && oneTouchPageName) {
    console.log('Page Reloaded');
    const oneTouchDOMBody = document.querySelector('#oneTouchBodyContainer');
    oneTouchDOMBody.innerHTML = sessionStorage.getItem('oneTouchDOMBody');
  }
});

const fetchOneTouchUsersFromDB = async () => {
  await authenticateUser();

  _fetchAllOneTouchCustomers('manage-customers');
};

document.querySelector('body').addEventListener('click', (event) => {
  const customerInfo = event.target.nodeName === 'CUSTOMERINFO';
  const deleteCustomer = event.target.nodeName === 'DELETECUSTOMER';

  let id = event.target.getAttribute('id');

  if (customerInfo) {
    authenticateUser();

    _errorMessage(`Info User ID: ${id} `, 'success');
  }
  if (deleteCustomer) {
    authenticateUser();

    _deleteOneTouchCustomer(id, customerEmail, 'manage-customers');
  }
});
