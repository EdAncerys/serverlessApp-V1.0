import { _newOrderPostcodeValidation } from './_helperFunctions/_icukBroadband/_newOrderPostcodeValidation.js';
import { _errorMessage } from './_helperFunctions/_errorMessage.js';
import { _placeBroadbandOrder } from './_helperFunctions/_icukBroadband/_placeBroadbandOrder.js';
import { _saveAddressData } from './_helperFunctions/_icukBroadband/_saveAddressData.js';
import { _manageOrderData } from './_helperFunctions/_icukBroadband/_manageOrderData.js';
import { _termsAndConditions } from './_helperFunctions/_icukBroadband/_termsAndConditions.js';
import { _getBroadbandAvailability } from './_helperFunctions/_icukBroadband/_getBroadbandAvailability.js';
import { persistDOMData } from './persistDOMData.js';

import { _spinner } from './_helperFunctions/_spinner.js';

document.addEventListener('DOMContentLoaded', () => {
  // Persist user data on reload
  const oneTouchDOMBody = sessionStorage.getItem('oneTouchDOMBody') === null;
  const oneTouchBodyName =
    sessionStorage.getItem('oneTouchBodyName') === 'order-new-connection';

  if (!oneTouchDOMBody && oneTouchBodyName) {
    console.log('Page Reloaded');
    const oneTouchDOMBody = document.querySelector('#oneTouchBodyContainer');
    oneTouchDOMBody.innerHTML = sessionStorage.getItem('oneTouchDOMBody');
  }
  // Btn event listeners
  document
    .getElementById('getAddressForPostcodeProvided')
    .addEventListener('click', getAddressForPostcodeProvided);
  document
    .getElementById('oneTouchUsers')
    .addEventListener('click', oneTouchUsers);
});
// // Persist user data on reload
// const oneTouchDOMBody = sessionStorage.getItem('oneTouchDOMBody');
// if (
//   performance.navigation.type === PerformanceNavigation.TYPE_RELOAD &&
//   oneTouchDOMBody
// ) {
//   console.info('Page reloaded');
//   const body = document.querySelector('#oneTouchBodyContainer');
//   body.innerHTML = oneTouchDOMBody;
//   // Add classList if checkbox not checked upon reload
//   let oneTouchPlaceOrder = document.querySelector('oneTouchPlaceOrder');
//   if (oneTouchPlaceOrder) oneTouchPlaceOrder.classList.add('btnDisable');
// }
// // Create custom event
// const observer = new MutationObserver((list) => {
//   const evt = new CustomEvent('dom-changed', { detail: list });
//   document.body.dispatchEvent(evt);
// });
// // Listen to DOM changes
// observer.observe(document.body, {
//   attributes: true,
//   childList: true,
//   subtree: true,
// });
// // Save DOM changes to localStorage
// document.body.addEventListener('dom-changed', (e) => {
//   console.info('Saving DOM Body data to sessionStorage...');
//   const oneTouchDOMBody = document.querySelector('#oneTouchBodyContainer')
//     .innerHTML;
//   sessionStorage.setItem('oneTouchBodyName', 'order-new-connection');
//   sessionStorage.setItem('oneTouchDOMBody', oneTouchDOMBody);
// });

const getAddressForPostcodeProvided = (ev) => {
  ev.preventDefault();
  _newOrderPostcodeValidation();
};

const oneTouchUsers = (ev) => {
  ev.preventDefault();
  _errorMessage('Load Users From DB', 'success');
};

document.querySelector('body').addEventListener('click', (event) => {
  const getBroadbandAvailability =
    event.target.nodeName === 'GETBROADBANDAVAILABILITY';
  const selectOrder = event.target.nodeName === 'SELECTORDER';
  const termsAndConditions = event.target.nodeName === 'TERMSANDCONDITIONS';
  const agreeWithTermsAndConditions =
    event.target.nodeName === 'LABEL' || 'INPUT';
  const oneTouchPlaceOrder = event.target.nodeName === 'ONETOUCHPLACEORDER';
  // Slider nav functionality
  const goBackBtn = event.target.nodeName === 'GOBACKBTN';

  // console.log(event.target);
  if (getBroadbandAvailability) {
    _getBroadbandAvailability();
    return;
  }
  if (selectOrder) {
    _manageOrderData(
      event.target.getAttribute('name'),
      event.target.getAttribute('provider'),
      event.target.getAttribute('likely_down_speed'),
      event.target.getAttribute('likely_up_speed'),
      event.target.getAttribute('price'),
      event.target.getAttribute('installation')
    );
    return;
  }
  if (termsAndConditions) {
    _termsAndConditions();
    return;
  }
  if (agreeWithTermsAndConditions && event.target.type === 'checkbox') {
    let checkbox = event.target.checked;
    let oneTouchPlaceOrder = document.querySelector('oneTouchPlaceOrder');

    if (checkbox) {
      oneTouchPlaceOrder.classList.remove('btnDisable');
    } else {
      oneTouchPlaceOrder.classList.add('btnDisable');
    }
  }
  if (oneTouchPlaceOrder) {
    _placeBroadbandOrder();
    return;
  }
  if (goBackBtn) {
    const id = event.target.id;
    console.log(event.target.id);
    if (id === 'pageOne') {
      document.querySelector('#oneTouchBroadbandOrderPageTwo').remove();
      document
        .querySelector('#oneTouchBroadbandOrderPageOne')
        .classList.remove('hidden');
    }
    if (id === 'pageTwo') {
      document.querySelector('#oneTouchBroadbandOrderPageThree').remove();
      document
        .querySelector('#oneTouchBroadbandOrderPageTwo')
        .classList.remove('hidden');
    }
    if (id === 'pageThree') {
      document.querySelector('#oneTouchBroadbandOrderPageFour').remove();
      document
        .querySelector('#oneTouchBroadbandOrderPageThree')
        .classList.remove('hidden');
    }
    if (id === 'pageFour') {
      document.querySelector('#oneTouchBroadbandOrderPageFive').remove();
      document
        .querySelector('#oneTouchBroadbandOrderPageFour')
        .classList.remove('hidden');
    }
    persistDOMData('oneTouchBodyContainer', 'order-new-connection');

    return;
  }
});

document.querySelector('body').addEventListener('change', (event) => {
  const saveAddressData = event.target.nodeName === 'SELECT';
  if (saveAddressData) {
    _saveAddressData();
    return;
  }
});
