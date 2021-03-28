import { authenticateUser } from './authenticateUser.js';
import { _orderPostcodeValidation } from './helperFunctions/icukBroadband/_orderPostcodeValidation.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';
import { _placeBroadbandOrder } from './helperFunctions/icukBroadband/_placeBroadbandOrder.js';
import { _saveAddressData } from './helperFunctions/icukBroadband/_saveAddressData.js';
import { _reviewOrderData } from './helperFunctions/icukBroadband/_reviewOrderData.js';
import { _termsAndConditions } from './helperFunctions/icukBroadband/_termsAndConditions.js';
import { _getBroadbandAvailability } from './helperFunctions/icukBroadband/_getBroadbandAvailability.js';
import { persistDOMData } from './persistDOMData.js';
import { _fetchAllOneTouchCustomers } from './helperFunctions/mongoDB/oneTouchManageCustomer/_fetchAllOneTouchCustomers.js';
import { _fetchOneTouchCustomerDataById } from './helperFunctions/mongoDB/oneTouchManageCustomer/_fetchOneTouchCustomerDataById.js';
import { _spinner } from './helperFunctions/_spinner.js';

document.addEventListener('DOMContentLoaded', () => {
  // Persist user data on reload
  const oneTouchDOMBody = sessionStorage.getItem('oneTouchDOMBody') === null;
  const oneTouchPageName =
    sessionStorage.getItem('oneTouchPageName') === 'order-new-connection';

  if (!oneTouchDOMBody && oneTouchPageName) {
    console.log('Page Reloaded');
    const oneTouchDOMBody = document.querySelector('#oneTouchBodyContainer');
    oneTouchDOMBody.innerHTML = sessionStorage.getItem('oneTouchDOMBody');
  }
});

document.querySelector('body').addEventListener('click', (event) => {
  const fetchAddressesForPostcodeProvided =
    event.target.nodeName === 'FETCHADDRESSESFORPOSTCODEPROVIDED';
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
  // Slider nav functionality
  const goPageBack = event.target.nodeName === 'GOPAGEBACK';
  const customerInfo = event.target.nodeName === 'CUSTOMERINFO';

  // console.log(event.target);
  if (fetchAddressesForPostcodeProvided) {
    authenticateUser();

    _orderPostcodeValidation();
    return;
  }
  if (oneTouchCustomers) {
    authenticateUser();

    _fetchAllOneTouchCustomers('order-new-connection');
    return;
  }
  if (getBroadbandAvailability) {
    authenticateUser();

    _getBroadbandAvailability();
    return;
  }
  if (selectOrder) {
    authenticateUser();

    const oneTouchOrderData = JSON.parse(
      event.target.getAttribute('oneTouchOrderData')
    );
    _reviewOrderData(oneTouchOrderData);
    return;
  }
  if (termsAndConditions) {
    authenticateUser();

    _termsAndConditions();
    return;
  }
  if (agreeWithTermsAndConditions && event.target.type === 'checkbox') {
    authenticateUser();

    let checkbox = event.target.checked;
    let oneTouchPlaceOrder = document.querySelector('oneTouchPlaceOrder');

    if (checkbox) {
      oneTouchPlaceOrder.classList.remove('btnDisable');
    } else {
      oneTouchPlaceOrder.classList.add('btnDisable');
    }
  }
  if (oneTouchPlaceOrder) {
    authenticateUser();

    _placeBroadbandOrder();
    return;
  }
  if (userInfo) {
    authenticateUser();

    _errorMessage('User Info', 'warning');
    return;
  }
  if (selectCustomer) {
    authenticateUser();

    async function asyncDataRequest() {
      const id = event.target.id;
      console.log(id);
      const oneTouchData = await _fetchOneTouchCustomerDataById(id);
      console.log(oneTouchData);
      await sessionStorage.setItem(
        'oneTouchData',
        JSON.stringify(oneTouchData)
      );

      _getBroadbandAvailability();
    }
    asyncDataRequest();
    return;
  }
  if (goPageBack) {
    authenticateUser();

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
  if (customerInfo) {
    authenticateUser();

    const id = event.target.id;
    _errorMessage(`Customer ID: ${id}`, 'warning');
    return;
  }
});

document.querySelector('body').addEventListener('change', (event) => {
  const saveAddressData = event.target.nodeName === 'SELECT';
  if (saveAddressData) {
    authenticateUser();

    _saveAddressData();
    return;
  }
});
