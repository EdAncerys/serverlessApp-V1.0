import { authenticateUser } from './authenticateUser.js';
import { _oneTouchOrders } from './helperFunctions/mongoDB/_oneTouchOrders.js';
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
    authenticateUser();

    _oneTouchOrders();
  }
});

document.querySelector('body').addEventListener('click', (event) => {
  const orderInfo = event.target.nodeName === 'ORDERINFO';
  const deleteOrder = event.target.nodeName === 'DELETEORDER';

  let id = event.target.getAttribute('id');

  if (orderInfo) {
    authenticateUser();

    _errorMessage(id, 'success');
  }
  if (deleteOrder) {
    authenticateUser();

    _deleteOneTouchOrder(id);
  }
});
