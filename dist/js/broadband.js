import { _handleFormValidation } from './_helperFunctions/_icukBroadband/_handleFormValidation.js';
import { _errorMessage } from '../js/_helperFunctions/_errorMessage.js';

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('getAddress')
    .addEventListener('click', quoteBroadbandDeal);

  document.getElementById('getUsers').addEventListener('click', getUsers);

  // Hardcoded input value
  // document.getElementById('postcode').value = 'LE15 7GH'; // LE15 7GH
});

const quoteBroadbandDeal = (ev) => {
  ev.preventDefault();
  _handleFormValidation();
};

const getUsers = (ev) => {
  ev.preventDefault();
  _errorMessage('Load Users From DB', 'success');
};
