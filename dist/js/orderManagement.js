import { _oneTouchOrders } from '../JS/helperFunctions/mongoDB/_oneTouchOrders.js';
import { _deleteOneTouchOrder } from './helperFunctions/mongoDB/_deleteOneTouchOrder.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';

document.addEventListener('DOMContentLoaded', () => {
  // Persist user data on reload
  const oneTouchDOMBody = sessionStorage.getItem('oneTouchDOMBody') === null;
  const oneTouchBodyName =
    sessionStorage.getItem('oneTouchBodyName') === 'live-connections';

  if (!oneTouchDOMBody && oneTouchBodyName) {
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
  const btnInfoOrder = event.target.nodeName === 'BTNINFOORDER';
  const btnDeleteOrder = event.target.nodeName === 'BTNDELETEORDER';

  let id = event.target.getAttribute('id');
  let name = event.target.getAttribute('name');

  if (btnInfoOrder) {
    console.log(name);
    _errorMessage(name, 'success');
  }
  if (btnDeleteOrder) {
    console.log(name);
    _deleteOneTouchOrder(id);
  }
});
