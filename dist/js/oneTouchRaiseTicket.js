import { _freshDeskTicket } from './helperFunctions/freshDesk/_freshDeskTicket.js';
import { _oneTouchRenderTickets } from './helperFunctions/freshDesk/_oneTouchRenderTickets.js';
import { _oneTouchCreateTicket } from './helperFunctions/freshDesk/_oneTouchCreateTicket.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';
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
  const activateContract =
    event.target.getAttribute('id') === 'activateContract';
  let allTickets;
  if (className) allTickets = className.includes('allTickets');
  const goBackBtn =
    event.target.nodeName === 'BTNLABEL' || event.target.nodeName === 'INNER';

  let id = event.target.getAttribute('id');
  console.log(id);
  console.log(className);

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

  if (allTickets) {
    _oneTouchRenderTickets();
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
