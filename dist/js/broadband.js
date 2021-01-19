import { _handleFormValidation } from './_helperFunctions/_icukBroadband/_handleFormValidation.js';

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('getAddress')
    .addEventListener('click', quoteBroadbandDeal);

  // Hardcoded input value
  document.getElementById('postcode').value = 'LE15 7GH'; // LE15 7GH
});

// Hold selection values in file scope
let oderCustomerName = 'HardCoded Name value';
let oderCustomerEmail = 'HardCoded email value';
let oderSubject = '';
let oderPostcode = '';
let oderAddress = '';
let oderDeal = '';

// Broadband providers
let WBC_21CN = 'WBC_21CN';
let WBC_20CN = 'WBC_20CN';
let CABLE_AND_WIRELESS = 'CABLE_AND_WIRELESS';
let TTB = 'TTB';

const quoteBroadbandDeal = (ev) => {
  ev.preventDefault();
  _handleFormValidation();
};
