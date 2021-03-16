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
  const customerInfo = event.target.nodeName === 'CUSTOMERINFO';
  const updateCustomer = event.target.nodeName === 'UPDATECUSTOMER';
  const deleteCustomer = event.target.nodeName === 'DELETECUSTOMER';

  let id = event.target.getAttribute('id');
  let customerEmail = event.target.getAttribute('customerEmail');

  if (customerInfo) {
    console.log(id);
    _errorMessage('Info User Content', 'success');
  }
  if (updateCustomer) {
    console.log(id);
    _errorMessage('Update User Content', 'warning');
  }
  if (deleteCustomer) {
    console.log(id, customerEmail);
    _deleteOneTouchCustomer(id, customerEmail, 'manage-customers');
  }
});
