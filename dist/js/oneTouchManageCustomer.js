import { _errorMessage } from './helperFunctions/_errorMessage.js';
import { _oneTouchContracts } from './helperFunctions/mongoDB/oneTouchContracts/_oneTouchContracts.js';
import { _deleteOneTouchCustomer } from './helperFunctions/mongoDB/oneTouchManageCustomer/_deleteOneTouchCustomer.js';
import { _oneTouchCustomerSummary } from './helperFunctions/mongoDB/oneTouchManageCustomer/_oneTouchCustomerSummary.js';
import { persistDOMData } from './persistDOMData.js';

document.addEventListener('DOMContentLoaded', () => {
  // Persist user data on reload
  const endPoint = location.href.split('/').slice(-1)[0];
  const oneTouchDOMBody = sessionStorage.getItem('oneTouchDOMBody') === null;
  const oneTouchPageName =
    sessionStorage.getItem('oneTouchPageName') === endPoint;

  if (oneTouchDOMBody || !oneTouchPageName) {
    oneTouchContracts();
  }
  if (!oneTouchDOMBody && oneTouchPageName) {
    console.log('Page Reloaded');
    const oneTouchDOMBody = document.querySelector('#oneTouchBodyContainer');
    oneTouchDOMBody.innerHTML = sessionStorage.getItem('oneTouchDOMBody');
  }
});

const oneTouchContracts = async () => {
  await _oneTouchContracts('manage-customer');
};

document.querySelector('body').addEventListener('click', (event) => {
  const contractInfo = event.target.nodeName === 'CONTRACTINFO';
  const deleteContract = event.target.nodeName === 'DELETECONTRACT';
  const goPageBack = event.target.nodeName === 'GOPAGEBACK';
  const addCustomer = event.target.nodeName === 'ADDCUSTOMER';

  let id;
  if (event.target.getAttribute('id')) id = event.target.getAttribute('id');

  if (contractInfo) {
    _errorMessage(`Contract ID: ` + id, 'warning');
    // _oneTouchCustomerSummary(id, 'manage-customer');
  }
  if (deleteContract) {
    _deleteOneTouchCustomer(id);
  }
  if (goPageBack) {
    const oneTouchCustomer = document.getElementById('oneTouchCustomer');
    const oneTouchManageCustomerPageOne = document.getElementById(
      'oneTouchManageCustomerPageOne'
    );
    oneTouchManageCustomerPageOne.classList.remove('hidden');
    oneTouchCustomer.remove();
    const endPoint = location.href.split('/').slice(-1)[0];
    persistDOMData(endPoint);
  }
  if (addCustomer) {
    window.location.replace('/views/oneTouch/add-customer');
  }
});
