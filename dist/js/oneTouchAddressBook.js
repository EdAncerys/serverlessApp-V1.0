import { persistDOMData } from './persistDOMData.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';

import { _oneTouchCustomers } from './helperFunctions/mongoDB/oneTouchManageCustomer/_oneTouchCustomers.js';

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

document.querySelector('body').addEventListener('click', (event) => {
  const goBackBtn =
    event.target.nodeName === 'LABEL' || event.target.nodeName === 'INNER';

  // console.log(event.target.getAttribute('id'), event.target.nodeName);

  let id;
  if (event.target.getAttribute('id')) id = event.target.getAttribute('id');

  if (goBackBtn) {
    const oneTouchManageCustomerPageOne = document.querySelector(
      '#oneTouchManageCustomerPageOne'
    );
    const oneTouchManageCustomerPageTwo = document.querySelector(
      '#oneTouchManageCustomerPageTwo'
    );
    oneTouchManageCustomerPageOne.classList.remove('hidden');
    oneTouchManageCustomerPageTwo.remove();
    const endPoint = location.href.split('/').slice(-1)[0];
    persistDOMData(endPoint);
  }
  if (contractInfo) {
    _oneTouchContractInfo(id);
  }
  if (deleteContract) {
    _deleteOneTouchCustomer(id);
  }
});
