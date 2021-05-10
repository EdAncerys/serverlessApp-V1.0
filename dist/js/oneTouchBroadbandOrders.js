import { persistDOMData } from './persistDOMData.js';
import { _deleteOneTouchBroadband } from './helperFunctions/mongoDB/oneTouchBroadband/_deleteOneTouchBroadband.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';
import { _oneTouchAllPlacedOrders } from './helperFunctions/mongoDB/oneTouchBroadband/_oneTouchAllPlacedOrders.js';
import { _oneTouchContractInfo } from './helperFunctions/mongoDB/oneTouchContracts/_oneTouchContractInfo.js';

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
  } else {
    console.log('Fetching Orders');
    _oneTouchAllPlacedOrders();
  }
});

const asyncDeleteContract = async (id) => {
  await _deleteOneTouchBroadband(id);
  await _oneTouchAllPlacedOrders();
};

const _activateContract = async (event) => {
  event.preventDefault();
  const today = new Date();
  var dd = today.getDate();
  const contractStartDay = document.getElementById('contractStartDay').value;
  const contractEndDay = document.getElementById('contractEndDay').value;
  const contractDescription = document.getElementById('contractDescription')
    .value;

  if (contractStartDay && contractEndDay !== '') {
    console.log(dd);
    console.table(contractStartDay, contractEndDay);
  }
};

document.querySelector('body').addEventListener('click', (event) => {
  const contractInfo = event.target.nodeName === 'CONTRACTINFO';
  const deleteContract = event.target.nodeName === 'DELETECONTRACT';
  const placeNewOrder = event.target.nodeName === 'PLACENEWORDER';
  const activateContract =
    event.target.getAttribute('id') === 'activateContract';
  const goBackBtn =
    event.target.nodeName === 'BTNLABEL' || event.target.nodeName === 'INNER';

  let id = event.target.getAttribute('id');

  if (goBackBtn) {
    const oneTouchContracts = document.querySelector('#oneTouchContracts');
    const removeData = document.querySelector('#oneTouchContractInfo');
    oneTouchContracts.classList.remove('hidden');
    removeData.remove();
    const endPoint = location.href.split('/').slice(-1)[0];
    persistDOMData(endPoint);
  }
  if (contractInfo) {
    _oneTouchContractInfo(id);
  }
  if (deleteContract) {
    asyncDeleteContract(id);
  }
  if (placeNewOrder) {
    window.location.replace('/views/oneTouch/connection-checker.html');
  }
  if (activateContract) {
    _activateContract(event);
  }
});
