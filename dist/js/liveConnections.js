import { _deleteOneTouchOrder } from './helperFunctions/mongoDB/oneTouchOrders/_deleteOneTouchOrder.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';
import { _oneTouchAllPlacedOrders } from './helperFunctions/mongoDB/oneTouchOrders/_oneTouchAllPlacedOrders.js';

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

document.querySelector('body').addEventListener('click', (event) => {
  const orderInfo = event.target.nodeName === 'ORDERINFO';
  const deleteOrder = event.target.nodeName === 'DELETEORDER';
  const placeNewOrder = event.target.nodeName === 'PLACENEWORDER';

  let id = event.target.getAttribute('id');

  if (orderInfo) {
    _errorMessage(id, 'success');
  }
  if (deleteOrder) {
    _deleteOneTouchOrder(id);
  }
  if (placeNewOrder) {
    window.location.replace('/views/oneTouch/order-new-connection.html');
  }
});
