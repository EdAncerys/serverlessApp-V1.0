import { _customerAddressForPostcodeProvided } from './helperFunctions/mongoDB/oneTouchManageCustomer/_customerAddressForPostcodeProvided.js';
import { _handleCustomerAddressSelection } from './helperFunctions/mongoDB/oneTouchManageCustomer/_handleCustomerAddressSelection.js';
import { _addOneTouchCustomerToDB } from './helperFunctions/mongoDB/oneTouchManageCustomer/_addOneTouchCustomerToDB.js';
import { _saveAddressData } from './helperFunctions/icukBroadband/_saveAddressData.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';
import { _validateEmail } from './helperFunctions/_validateEmail.js';
import { persistDOMData } from './persistDOMData.js';

document.addEventListener('DOMContentLoaded', () => {
  // addFormData();

  // Persist user data on reload
  const endPoint = location.href.split('/').slice(-1)[0];
  const oneTouchDOMBody = sessionStorage.getItem('oneTouchDOMBody') === null;
  const oneTouchPageName =
    sessionStorage.getItem('oneTouchPageName') === endPoint;

  if (!oneTouchDOMBody && oneTouchPageName) {
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

const customerAddressSearch = async (ev) => {
  ev.preventDefault();
  await _customerAddressForPostcodeProvided();
  return;
};

const addUser = async (ev) => {
  ev.preventDefault();

  // Form validation
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
  const oneTouch = sessionStorage.getItem('oneTouch') === null;
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
  if (oneTouch) {
    _errorMessage('Please Add Customer Address!', 'warning');
    return;
  }
  if (userFromValidation && !oneTouch) _addOneTouchCustomerToDB();

  return;
};

document.querySelector('body').addEventListener('click', (event) => {
  const selectCustomerAddress =
    event.target.nodeName === 'SELECTCUSTOMERADDRESS';
  const goPageBack = event.target.nodeName === 'GOPAGEBACK';

  // console.log(event.target);
  if (selectCustomerAddress) {
    const userSelection = document.getElementById('selectedAddress').value;
    if (userSelection !== 'userSelection') {
      _handleCustomerAddressSelection();
      return;
    }
    _errorMessage(
      'Please Select User Address From The List Provided!',
      'warning'
    );
    return;
  }
  if (goPageBack) {
    document.querySelector('#selectAddressContainer').remove();
    document.querySelector('#userPostcodeContainer').classList.remove('hidden');
    document.querySelector('#installationPostcode').value = '';
    const endPoint = location.href.split('/').slice(-1)[0];
    persistDOMData(endPoint);

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

const addFormData = () => {
  document.querySelector('#customerFullName').value = 'John Doe';
  document.querySelector('#customerPhoneNumber').value = '0799988877';
  document.querySelector('#customerEmail').value = 'john@email.com';

  document.querySelector('#companyName').value = 'Company Name';
  document.querySelector('#productType').value = 'Product Type';
  document.querySelector('#companyEmail').value = 'company@email.com';
  document.querySelector('#companyPhoneNumber').value = '0799988877';
  document.querySelector('#accountManager').value = 'Account Manager';
  document.querySelector('#companyRegistration').value = 'Company Registration';

  document.querySelector('#contactName').value = 'John Doe';
  document.querySelector('#contactPhoneNumber').value = '0799988877';
  document.querySelector('#contactEmail').value = 'contact@email.com';

  document.querySelector('#installationPostcode').value = 'E163DY';
  document.querySelector('#customerNotes').value = 'Customer Notes';
};
