import { persistDOMData } from './persistDOMData.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';
import { _oneTouchContracts } from './helperFunctions/mongoDB/oneTouchContracts/_oneTouchContracts.js';
import { _oneTouchContractInfo } from './helperFunctions/mongoDB/oneTouchContracts/_oneTouchContractInfo.js';
import { _deleteOneTouchBroadband } from './helperFunctions/mongoDB/oneTouchBroadband/_deleteOneTouchBroadband.js';

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
  await _deleteOneTouchBroadband(id);
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
