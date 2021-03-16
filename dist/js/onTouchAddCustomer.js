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
  const customerFullName =
    document.getElementById('customerFullName').value === '';
  const customerEmail = document
    .getElementById('customerEmail')
    .value.replace(/\s/g, '');
  const companyEmail = document
    .getElementById('companyEmail')
    .value.replace(/\s/g, '');
  const contactEmail = document
    .getElementById('contactEmail')
    .value.replace(/\s/g, '');
  const userAddressValidation =
    sessionStorage.getItem('userAddressValidation') === 'true';
  const userFromValidation =
    !customerFullName &&
    _validateEmail(customerEmail) &&
    _validateEmail(companyEmail) &&
    _validateEmail(contactEmail);

  if (customerFullName) {
    _errorMessage('Full Name Not Provided!', 'warning');
    return;
  }
  if (!_validateEmail(customerEmail)) {
    _errorMessage('Customer Email Not Provided or Incorrect!', 'warning');
    return;
  }
  if (!_validateEmail(companyEmail)) {
    _errorMessage('Company Email Not Provided or Incorrect!', 'warning');
    return;
  }
  if (!_validateEmail(contactEmail)) {
    _errorMessage('Site Contact Email Not Provided or Incorrect!', 'warning');
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
      _errorMessage(
        'Please Select User Address From The List Provided!',
        'warning'
      );
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
