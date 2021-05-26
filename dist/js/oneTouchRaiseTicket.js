import { _freshDeskTicket } from './helperFunctions/freshDesk/_freshDeskTicket.js';
import { _oneTouchAllTickets } from './helperFunctions/freshDesk/_oneTouchAllTickets.js';
import { _oneTouchCreateTicket } from './helperFunctions/freshDesk/_oneTouchCreateTicket.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';
import { _searchBox } from './helperFunctions/_searchBox.js';
import { persistDOMData } from './persistDOMData.js';

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
  let className = event.target.getAttribute('class');
  let id = event.target.getAttribute('id');

  let allTickets;
  if (className) allTickets = className.includes('allTickets');
  const goBackBtn =
    event.target.nodeName === 'BTNLABEL' || event.target.nodeName === 'INNER';
  const btnTicketComponent = event.target.nodeName === 'BTNTICKETCOMPONENT';

  if (goBackBtn) {
    const oneTouchFormContainer = document.querySelector(
      '#oneTouchFormContainer'
    );
    oneTouchFormContainer.classList.remove('hidden');
    const removeData = document.querySelector('#oneTouchTickets');
    removeData.remove();

    const endPoint = location.href.split('/').slice(-1)[0];
    persistDOMData(endPoint);
  }
  if (btnTicketComponent) {
    _freshDeskTicket(id);
  }
  if (allTickets) {
    _oneTouchAllTickets();
  }
});

document.querySelector('body').addEventListener('keyup', (event) => {
  _searchBox();
});
