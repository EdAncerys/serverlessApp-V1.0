import { _handleFormValidation } from './_helperFunctions/_icukBroadband/_handleFormValidation.js';
import { _errorMessage } from '../js/_helperFunctions/_errorMessage.js';

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('getAddressForPostcodeProvided')
    .addEventListener('click', getAddressForPostcodeProvided);

  document
    .getElementById('oneTouchUsers')
    .addEventListener('click', oneTouchUsers);

  // Hardcoded input value
  // document.getElementById('postcode').value = 'LE15 7GH'; // LE15 7GH
});

const getAddressForPostcodeProvided = (ev) => {
  ev.preventDefault();
  _handleFormValidation();
};

const oneTouchUsers = (ev) => {
  ev.preventDefault();
  _errorMessage('Load Users From DB', 'success');
};
