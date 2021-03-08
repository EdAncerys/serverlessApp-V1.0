import { _fetchUserAddress } from './_helperFunctions/mongoDB/oneTouchAddUsers/_fetchUserAddress.js';
import { _handleUserAddressSelection } from './_helperFunctions/mongoDB/oneTouchAddUsers/_handleUserAddressSelection.js';
import { _addOneTouchUserToDB } from './_helperFunctions/mongoDB/oneTouchAddUsers/_addOneTouchUserToDB.js';
import { _saveAddressData } from './_helperFunctions/_icukBroadband/_saveAddressData.js';
import { _errorMessage } from './_helperFunctions/_errorMessage.js';
import { _validateEmail } from './_helperFunctions/_validateEmail.js';

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('userAddressSearch')
    .addEventListener('click', userAddressSearch);
  document.getElementById('addUser').addEventListener('click', addUser);
});

// Persist user data on reload
const oneTouchDOMBody = sessionStorage.getItem('oneTouchDOMBody');

if (
  performance.navigation.type === PerformanceNavigation.TYPE_RELOAD &&
  oneTouchDOMBody
) {
  console.info('Page reloaded');
  const body = document.querySelector('#oneTouchBodyContainer');
  body.innerHTML = oneTouchDOMBody;

  document.querySelector('#fullName').value = sessionStorage.getItem(
    'addUserFormFullName'
  );
  document.querySelector('#phoneNumber').value = sessionStorage.getItem(
    'addUserFormPhoneNumber'
  );
  document.querySelector('#email').value = sessionStorage.getItem(
    'addUserFormEmail'
  );
  document.querySelector('#notes').value = sessionStorage.getItem(
    'addUserFormNotes'
  );
}
// Create custom event
const observer = new MutationObserver((list) => {
  const evt = new CustomEvent('dom-changed', { detail: list });
  document.body.dispatchEvent(evt);
});
// Listen to DOM changes
observer.observe(document.body, {
  attributes: true,
  childList: true,
  subtree: true,
});
// Save DOM changes to localStorage
document.body.addEventListener('dom-changed', (e) => {
  console.info('Saving DOM Body data to sessionStorage...');
  const oneTouchDOMBody = document.querySelector('#oneTouchBodyContainer')
    .innerHTML;
  const addUserFormFullName = document.querySelector('#fullName').value;
  const addUserFormPhoneNumber = document.querySelector('#phoneNumber').value;
  const addUserFormEmail = document.querySelector('#email').value;
  const addUserFormNotes = document.querySelector('#notes').value;

  sessionStorage.setItem('oneTouchBodyName', 'add-user');
  sessionStorage.setItem('oneTouchDOMBody', oneTouchDOMBody);
  sessionStorage.setItem('addUserFormFullName', addUserFormFullName);
  sessionStorage.setItem('addUserFormPhoneNumber', addUserFormPhoneNumber);
  sessionStorage.setItem('addUserFormEmail', addUserFormEmail);
  sessionStorage.setItem('addUserFormNotes', addUserFormNotes);
});

const userAddressSearch = (ev) => {
  ev.preventDefault();
  _fetchUserAddress();
};

const addUser = (ev) => {
  ev.preventDefault();
  const fullName = document.getElementById('fullName').value === '';
  const email = document.getElementById('email').value;
  const userAddressValidation =
    sessionStorage.getItem('userAddressValidation') === 'true';
  const userFromValidation = !fullName && _validateEmail(email);

  if (fullName) _errorMessage('Full Name Not Provided!', 'warring');
  if (!_validateEmail(email))
    _errorMessage('Email Not Provided or Incorrect!', 'warring');
  if (!userAddressValidation)
    _errorMessage('Please Add User Address!', 'warring');
  if (userFromValidation && userAddressValidation) _addOneTouchUserToDB();

  return;
};

document.querySelector('body').addEventListener('click', (event) => {
  const selectUserAddress = event.target.nodeName === 'SELECTUSERADDRESS';
  const goBackBtn = event.target.nodeName === 'GOBACKBTN';

  // console.log(event.target);
  if (selectUserAddress) {
    const userSelection = document.getElementById('selectedAddress').value;
    if (userSelection !== 'userSelection') {
      _handleUserAddressSelection();
    } else {
      _errorMessage('Please Select User Address From The List Provided!');
    }
    return;
  }
  if (goBackBtn) {
    document.querySelector('#selectAddressContainer').remove();
    document.querySelector('#userPostcodeContainer').classList.remove('hidden');
    document.querySelector('#postcode').value = '';
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
