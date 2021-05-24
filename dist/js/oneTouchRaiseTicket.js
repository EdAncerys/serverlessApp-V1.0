import { _freshDeskTicket } from './helperFunctions/freshDesk/_freshDeskTicket.js';
import { _oneTouchCreateTicket } from './helperFunctions/freshDesk/_oneTouchCreateTicket.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('raiseTicket').addEventListener('click', raiseTicket);
});

document.addEventListener('DOMContentLoaded', (event) => {
  // Persist user data on reload
  const endPoint = location.href.split('/').slice(-1)[0];
  const oneTouchDOMBody = sessionStorage.getItem('oneTouchDOMBody') === null;
  const oneTouchPageName =
    sessionStorage.getItem('oneTouchPageName') === endPoint;

  if (!oneTouchDOMBody && oneTouchPageName) {
    console.log('Page Reloaded');
    const oneTouchDOMBody = document.querySelector('#oneTouchBodyContainer');
    oneTouchDOMBody.innerHTML = sessionStorage.getItem('oneTouchDOMBody');
    return;
  }

  console.log(`Fetching User Tickets`);
  _freshDeskTicket();
});

const raiseTicket = async (event) => {
  event.preventDefault();
  _oneTouchCreateTicket();
  return;
};

document.querySelector('body').addEventListener('click', (event) => {
  const raiseTicket = event.target.getAttribute('id') === 'activateContract';
  // const deleteContract = event.target.nodeName === 'DELETECONTRACT';

  let id = event.target.getAttribute('id');

  // if (goBackBtn) {
  //   sessionStorage.removeItem('oneTouchBroadband');
  //   const oneTouchContracts = document.querySelector('#oneTouchContracts');
  //   const removeData = document.querySelector('#oneTouchContractInfo');
  //   oneTouchContracts.classList.remove('hidden');
  //   removeData.remove();
  //   const endPoint = location.href.split('/').slice(-1)[0];
  //   persistDOMData(endPoint);
  // }

  if (raiseTicket) {
    raiseTicket(event);
  }
});
