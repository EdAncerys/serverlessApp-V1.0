import { persistDOMData } from './persistDOMData.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';

import { _oneTouchCustomers } from './helperFunctions/mongoDB/oneTouchManageCustomer/_oneTouchCustomers.js';
import { _deleteOneTouchCustomer } from './helperFunctions/mongoDB/oneTouchManageCustomer/_deleteOneTouchCustomer.js';
import { _findOneTouchCustomerById } from './helperFunctions/mongoDB/oneTouchManageCustomer/_findOneTouchCustomerById.js';

document.addEventListener('DOMContentLoaded', () => {
  // Persist user data on reload
  const endPoint = location.href.split('/').slice(-1)[0];
  const oneTouchDOMBody = sessionStorage.getItem('oneTouchDOMBody') === null;
  const oneTouchPageName =
    sessionStorage.getItem('oneTouchPageName') === endPoint;

  if (oneTouchDOMBody || !oneTouchPageName) {
    oneTouchCustomers();
  }
  if (!oneTouchDOMBody && oneTouchPageName) {
    console.log('Page Reloaded');
    const oneTouchDOMBody = document.querySelector('#oneTouchBodyContainer');
    oneTouchDOMBody.innerHTML = sessionStorage.getItem('oneTouchDOMBody');
  }
});

const oneTouchCustomers = async () => {
  await _oneTouchCustomers();
};
const oneTouchDeleteCustomer = async (id) => {
  await _deleteOneTouchCustomer(id);
  await _oneTouchCustomers();
};

document.querySelector('body').addEventListener('click', (event) => {
  const goBackBtn =
    event.target.nodeName === 'BTNLABEL' || event.target.nodeName === 'INNER';
  const customerInfo = event.target.nodeName === 'CUSTOMERINFO';
  const deleteCustomer = event.target.nodeName === 'DELETECUSTOMER';
  const addCustomer = event.target.nodeName === 'ADDCUSTOMER';

  // console.log(event.target.getAttribute('id'), event.target.nodeName);

  let id;
  if (event.target.getAttribute('id')) id = event.target.getAttribute('id');

  if (addCustomer) {
    window.location.replace('/views/oneTouch/add-customer');
  }
  if (goBackBtn) {
    const unHideData = document.querySelector('#oneTouchCustomerList');
    const removeData = document.querySelector('#oneTouchCustomerInfo');
    unHideData.classList.remove('hidden');
    removeData.remove();
    const endPoint = location.href.split('/').slice(-1)[0];
    persistDOMData(endPoint);
  }
  if (customerInfo) {
    const displayData = true;
    _findOneTouchCustomerById(id, displayData);
  }
  if (deleteCustomer) {
    oneTouchDeleteCustomer(id);
  }
});

document.querySelector('body').addEventListener('keyup', (event) => {
  const searchBox = document.querySelector('#searchBox');
  const keyword = searchBox.value.toLowerCase();
  console.log(`Search keyword: ` + keyword);
  const searchRowComponent = document.querySelectorAll('searchRowComponent');

  searchRowComponent.forEach((row) => {
    let matchFound;

    const search = row.getElementsByTagName('search');
    Array.prototype.map.call(search, (list) => {
      const nodeText = list.innerHTML.toLowerCase();
      if (nodeText.includes(keyword)) matchFound = true;
    });

    if (matchFound) {
      row.style.display = 'block';
    } else {
      row.style.display = 'none';
    }
  });
});
