import { persistDOMData } from './persistDOMData.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';
import { _oneTouchContracts } from './helperFunctions/mongoDB/oneTouchContracts/_oneTouchContracts.js';
import { _oneTouchContractInfo } from './helperFunctions/mongoDB/oneTouchContracts/_oneTouchContractInfo.js';
import { _deleteOneTouchOrder } from './helperFunctions/mongoDB/oneTouchOrders/_deleteOneTouchOrder.js';

document.addEventListener('DOMContentLoaded', () => {
  // Persist user data on reload
  const endPoint = location.href.split('/').slice(-1)[0];
  const oneTouchDOMBody = sessionStorage.getItem('oneTouchDOMBody') === null;
  const oneTouchPageName =
    sessionStorage.getItem('oneTouchPageName') === endPoint;

  if (oneTouchDOMBody || !oneTouchPageName) {
    oneTouchContracts();
  }
  if (!oneTouchDOMBody && oneTouchPageName) {
    console.log('Page Reloaded');
    const oneTouchDOMBody = document.querySelector('#oneTouchBodyContainer');
    oneTouchDOMBody.innerHTML = sessionStorage.getItem('oneTouchDOMBody');
  }
});

const oneTouchContracts = async () => {
  await _oneTouchContracts();
};
const asyncDeleteContract = async (id) => {
  await _deleteOneTouchOrder(id);
  await _oneTouchContracts();
};

document.querySelector('body').addEventListener('click', (event) => {
  const contractInfo = event.target.nodeName === 'CONTRACTINFO';
  const deleteContract = event.target.nodeName === 'DELETECONTRACT';
  const goPageBack = event.target.nodeName === 'GOPAGEBACK';
  const addNewContract = event.target.nodeName === 'ADDNEWCONTRACT';
  const goBackBtn =
    event.target.nodeName === 'BTNLABEL' || event.target.nodeName === 'INNER';

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
    asyncDeleteContract(id);
  }
  if (goPageBack) {
    const oneTouchCustomer = document.getElementById('oneTouchCustomer');
    const oneTouchManageCustomerPageOne = document.getElementById(
      'oneTouchManageCustomerPageOne'
    );
    oneTouchManageCustomerPageOne.classList.remove('hidden');
    oneTouchCustomer.remove();
    const endPoint = location.href.split('/').slice(-1)[0];
    persistDOMData(endPoint);
  }
  if (addNewContract) {
    window.location.replace('/views/oneTouch/connection-checker');
  }
});
