import { _handleFormValidation } from './_helperFunctions/_icukBroadband/_handleFormValidation.js';

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('getAddress')
    .addEventListener('click', quoteBroadbandDeal);

  // Hardcoded input value
  document.getElementById('postcode').value = 'LE15 7GH'; // LE15 7GH
});

const quoteBroadbandDeal = (ev) => {
  ev.preventDefault();
  _handleFormValidation();
};

const getBroadbandAvailability = (ev) => {
  // ev.preventDefault();
  console.log('click');
};
