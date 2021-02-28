import { _newOrderPostcodeValidation } from './_helperFunctions/_icukBroadband/_newOrderPostcodeValidation.js';
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
// Persist user data on reload
const oneTouchDOMBody = sessionStorage.getItem('oneTouchDOMBody');
if (
  performance.navigation.type === PerformanceNavigation.TYPE_RELOAD &&
  oneTouchDOMBody
) {
  console.info('This page is reloaded');
  const body = document.querySelector('body');
  body.innerHTML = oneTouchDOMBody;
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
  console.info('Saving Data to sessionStorage...');
  const oneTouchDOMBody = document.body.innerHTML;
  sessionStorage.setItem('oneTouchDOMBody', oneTouchDOMBody);
});

const getAddressForPostcodeProvided = (ev) => {
  ev.preventDefault();
  _newOrderPostcodeValidation();
};

const oneTouchUsers = (ev) => {
  ev.preventDefault();
  _errorMessage('Load Users From DB', 'success');
};
