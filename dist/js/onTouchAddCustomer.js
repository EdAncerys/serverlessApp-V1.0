import { _customerAddressForPostcodeProvided } from './helperFunctions/mongoDB/oneTouchAddCustomer/_customerAddressForPostcodeProvided.js';
import { _handleCustomerAddressSelection } from './helperFunctions/mongoDB/oneTouchAddCustomer/_handleCustomerAddressSelection.js';
import { _addOneTouchCustomerToDB } from './helperFunctions/mongoDB/oneTouchAddCustomer/_addOneTouchCustomerToDB.js';
import { _saveAddressData } from './helperFunctions/icukBroadband/_saveAddressData.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';
import { _validateEmail } from './helperFunctions/_validateEmail.js';
import { persistDOMData } from './persistDOMData.js';

document.addEventListener('DOMContentLoaded', () => {
  // Persist user data on reload
  const oneTouchDOMBody = sessionStorage.getItem('oneTouchDOMBody') === null;
  const oneTouchBodyName =
    sessionStorage.getItem('oneTouchBodyName') === 'add-customer';

  if (!oneTouchDOMBody && oneTouchBodyName) {
    console.log('Page Reloaded');
    const oneTouchDOMBody = document.querySelector('#oneTouchBodyContainer');
    oneTouchDOMBody.innerHTML = sessionStorage.getItem('oneTouchDOMBody');
  }
  // Btn event listeners
  document
    .getElementById('customerAddressSearch')
    .addEventListener('click', customerAddressSearch);
  document.getElementById('addUser').addEventListener('click', addUser);
});

const customerAddressSearch = (ev) => {
  ev.preventDefault();
  _customerAddressForPostcodeProvided();
};

const addUser = (ev) => {
  ev.preventDefault();
  const fullName = document.getElementById('fullName').value === '';
  const email = document.getElementById('email').value;
  const userAddressValidation =
    sessionStorage.getItem('userAddressValidation') === 'true';
  const userFromValidation = !fullName && _validateEmail(email);

  if (fullName) {
    _errorMessage('Full Name Not Provided!', 'warning');
    return;
  }
  if (!_validateEmail(email)) {
    _errorMessage('Email Not Provided or Incorrect!', 'warning');
    return;
  }
  if (!userAddressValidation) {
    _errorMessage('Please Add User Address!', 'warning');
    return;
  }
  if (userFromValidation && userAddressValidation) _addOneTouchCustomerToDB();

  return;
};

document.querySelector('body').addEventListener('click', (event) => {
  const selectUserAddress = event.target.nodeName === 'SELECTUSERADDRESS';
  const goBackBtn = event.target.nodeName === 'GOBACKBTN';

  // console.log(event.target);
  if (selectUserAddress) {
    const userSelection = document.getElementById('selectedAddress').value;
    if (userSelection !== 'userSelection') {
      _handleCustomerAddressSelection();
    } else {
      _errorMessage('Please Select User Address From The List Provided!');
    }
    return;
  }
  if (goBackBtn) {
    document.querySelector('#selectAddressContainer').remove();
    document.querySelector('#userPostcodeContainer').classList.remove('hidden');
    document.querySelector('#installationPostcode').value = '';
    persistDOMData('oneTouchBodyContainer', 'add-customer');

    return;
  }
});

document.querySelector('body').addEventListener('change', (event) => {
  const saveAddressData = event.target.nodeName === 'SELECT';
  if (saveAddressData) {
    _saveAddressData();
    // console.log(event.target);
    return;
  }
});
