import { authenticateUser } from './authenticateUser.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';
import { _fetchAllOneTouchCustomers } from './helperFunctions/mongoDB/oneTouchManageCustomer/_fetchAllOneTouchCustomers.js';
import { _deleteOneTouchCustomer } from './helperFunctions/mongoDB/oneTouchManageCustomer/_deleteOneTouchCustomer.js';
import { _oneTouchCustomerSummary } from './helperFunctions/mongoDB/oneTouchManageCustomer/_oneTouchCustomerSummary.js';
import { persistDOMData } from './persistDOMData.js';

document.addEventListener('DOMContentLoaded', () => {
  // Persist user data on reload
  const oneTouchDOMBody = sessionStorage.getItem('oneTouchDOMBody') === null;
  const oneTouchPageName =
    sessionStorage.getItem('oneTouchPageName') === 'manage-customer';

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

  _fetchAllOneTouchCustomers('manage-customer');
};

document.querySelector('body').addEventListener('click', (event) => {
  const customerInfo = event.target.nodeName === 'CUSTOMERINFO';
  const deleteCustomer = event.target.nodeName === 'DELETECUSTOMER';
  const goPageBack = event.target.nodeName === 'GOPAGEBACK';

  if (customerInfo) {
    authenticateUser();

    const id = event.target.getAttribute('id');
    _oneTouchCustomerSummary(id, 'manage-customer');
  }
  if (deleteCustomer) {
    authenticateUser();

    _deleteOneTouchCustomer(id, 'manage-customer');
  }
  if (goPageBack) {
    authenticateUser();

    const oneTouchCustomer = document.getElementById('oneTouchCustomer');
    const oneTouchManageCustomerPageOne = document.getElementById(
      'oneTouchManageCustomerPageOne'
    );
    oneTouchManageCustomerPageOne.classList.remove('hidden');
    oneTouchCustomer.remove();
    persistDOMData('oneTouchBodyContainer', 'manage-customer');
  }
});
