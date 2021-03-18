import { _oneTouchOrders } from '../JS/helperFunctions/mongoDB/_oneTouchOrders.js';
import { _deleteOneTouchOrder } from './helperFunctions/mongoDB/_deleteOneTouchOrder.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';

document.addEventListener('DOMContentLoaded', () => {
  // Persist user data on reload
  const oneTouchDOMBody = sessionStorage.getItem('oneTouchDOMBody') === null;
  const oneTouchPageName =
    sessionStorage.getItem('oneTouchPageName') === 'live-connections';

  if (!oneTouchDOMBody && oneTouchPageName) {
    console.log('Page Reloaded');
    const oneTouchDOMBody = document.querySelector('#oneTouchBodyContainer');
    oneTouchDOMBody.innerHTML = sessionStorage.getItem('oneTouchDOMBody');
  } else {
    _oneTouchOrders();
  }
  // Btn event listeners
  document
    .getElementById('oneTouchOrders')
    .addEventListener('click', oneTouchOrders);
});

const oneTouchOrders = (ev) => {
  ev.preventDefault();
  _oneTouchOrders();
};

document.querySelector('body').addEventListener('click', (event) => {
  const orderInfo = event.target.nodeName === 'ORDERINFO';
  const deleteOrder = event.target.nodeName === 'DELETEORDER';

  let id = event.target.getAttribute('id');
  let name = event.target.getAttribute('name');

  if (orderInfo) {
    console.log(name);
    _errorMessage(name, 'success');
  }
  if (deleteOrder) {
    console.log(name);
    _deleteOneTouchOrder(id);
  }
});
