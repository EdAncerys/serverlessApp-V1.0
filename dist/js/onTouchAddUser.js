import { _fetchUserAddress } from './helperFunctions/mongoDB/oneTouchAddUsers/_fetchUserAddress.js';
import { _handleUserAddressSelection } from './helperFunctions/mongoDB/oneTouchAddUsers/_handleUserAddressSelection.js';
import { _addOneTouchUserToDB } from './helperFunctions/mongoDB/oneTouchAddUsers/_addOneTouchUserToDB.js';
import { _saveAddressData } from './helperFunctions/icukBroadband/_saveAddressData.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';
import { _validateEmail } from './helperFunctions/_validateEmail.js';
import { persistDOMData } from './persistDOMData.js';

document.addEventListener('DOMContentLoaded', () => {
  // Persist user data on reload
  const oneTouchDOMBody = sessionStorage.getItem('oneTouchDOMBody') === null;
  const oneTouchBodyName =
    sessionStorage.getItem('oneTouchBodyName') === 'add-user';

  if (!oneTouchDOMBody && oneTouchBodyName) {
    console.log('Page Reloaded');
    const oneTouchDOMBody = document.querySelector('#oneTouchBodyContainer');
    oneTouchDOMBody.innerHTML = sessionStorage.getItem('oneTouchDOMBody');
  }
  // Btn event listeners
  document
    .getElementById('userAddressSearch')
    .addEventListener('click', userAddressSearch);
  document.getElementById('addUser').addEventListener('click', addUser);
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
    persistDOMData('oneTouchBodyContainer', 'add-user');

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
