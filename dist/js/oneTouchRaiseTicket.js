import { _allFreshDeskTickets } from './helperFunctions/freshDesk/_allFreshDeskTickets.js';
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
  }
  // Btn event listeners
  document.getElementById('raiseTicket').addEventListener('click', raiseTicket);
});

const raiseTicket = async (event) => {
  event.preventDefault();
  _oneTouchCreateTicket();
  return;
};
