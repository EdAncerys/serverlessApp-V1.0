import { persistDOMData } from './persistDOMData.js';

import { _errorMessage } from './helperFunctions/_errorMessage.js';
import { _spinner } from './helperFunctions/_spinner.js';

import { _orderPostcodeValidation } from './helperFunctions/icukBroadband/_orderPostcodeValidation.js';
import { _placeBroadbandOrder } from './helperFunctions/icukBroadband/_placeBroadbandOrder.js';
import { _saveAddressData } from './helperFunctions/icukBroadband/_saveAddressData.js';
import { _reviewOrderData } from './helperFunctions/icukBroadband/_reviewOrderData.js';
import { _termsAndConditions } from './helperFunctions/icukBroadband/_termsAndConditions.js';
import { _getBroadbandAvailability } from './helperFunctions/icukBroadband/_getBroadbandAvailability.js';

import { _oneTouchCustomers } from './helperFunctions/mongoDB/oneTouchManageCustomer/_oneTouchCustomers.js';
import { _findOneTouchCustomerById } from './helperFunctions/mongoDB/oneTouchManageCustomer/_findOneTouchCustomerById.js';

document.addEventListener('DOMContentLoaded', () => {
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
});

document.querySelector('body').addEventListener('click', (event) => {
  const searchBroadbandAvailability =
    event.target.nodeName === 'SEARCHBROADBANDAVAILABILITY';
  const oneTouchCustomers = event.target.nodeName === 'ONETOUCHCUSTOMERS';

  const getBroadbandAvailability =
    event.target.nodeName === 'GETBROADBANDAVAILABILITY';
  const selectOrder = event.target.nodeName === 'SELECTORDER';
  const termsAndConditions = event.target.nodeName === 'TERMSANDCONDITIONS';
  const agreeWithTermsAndConditions =
    event.target.nodeName === 'LABEL' || 'INPUT';
  const oneTouchPlaceOrder = event.target.nodeName === 'ONETOUCHPLACEORDER';
  const userInfo = event.target.nodeName === 'USERINFO';
  const selectCustomer = event.target.nodeName === 'SELECTCUSTOMER';
  const customerInfo = event.target.nodeName === 'CUSTOMERINFO';
  // Slider nav functionality
  const goPageBack = event.target.nodeName === 'GOPAGEBACK';
  const searchEthernetAvailability =
    event.target.nodeName === 'SEARCHETHERNETAVAILABILITY';
  const addCustomer = event.target.nodeName === 'ADDCUSTOMER';

  // console.log(event.target);
  if (searchEthernetAvailability) {
    _errorMessage('Coming Soon...', 'warning');
    return;
  }
  if (searchBroadbandAvailability) {
    _orderPostcodeValidation();
    return;
  }
  if (oneTouchCustomers) {
    _oneTouchCustomers();
    return;
  }
  if (getBroadbandAvailability) {
    _getBroadbandAvailability();
    return;
  }
  if (selectOrder) {
    const oneTouchOrderData = JSON.parse(
      event.target.getAttribute('oneTouchOrderData')
    );
    _reviewOrderData(oneTouchOrderData);
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
  if (userInfo) {
    _errorMessage('User Info', 'warning');
    return;
  }
  if (selectCustomer) {
    async function asyncDataRequest() {
      const id = event.target.id;
      console.log(id);
      const oneTouch = await _findOneTouchCustomerById(id);
      console.log(oneTouch);
      await sessionStorage.setItem('oneTouch', JSON.stringify(oneTouch));

      _getBroadbandAvailability();
    }
    asyncDataRequest();
    return;
  }
  if (goPageBack) {
    const id = event.target.id;
    console.log(event.target.id);
    if (id === 'pageOne') {
      document.querySelector('#oneTouchCustomerList').remove();
      document
        .querySelector('#oneTouchBroadbandOrderPageOne')
        .classList.remove('hidden');
    }
    if (id === 'pageTwo') {
      document.querySelector('#oneTouchBroadbandOrderPageThree').remove();
      document
        .querySelector('#oneTouchCustomerList')
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

    const endPoint = location.href.split('/').slice(-1)[0];
    persistDOMData(endPoint);
    return;
  }
  if (customerInfo) {
    const id = event.target.id;
    _errorMessage(`Customer ID: ${id}`, 'warning');
    return;
  }
  if (addCustomer) {
    window.location.replace('/views/oneTouch/add-customer');
  }
});

document.querySelector('body').addEventListener('change', (event) => {
  const saveAddressData = event.target.nodeName === 'SELECT';
  if (saveAddressData) {
    _saveAddressData();
    return;
  }
});
