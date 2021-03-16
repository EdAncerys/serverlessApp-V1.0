import { _oneTouchOrders } from '../JS/helperFunctions/mongoDB/_oneTouchOrders.js';

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
