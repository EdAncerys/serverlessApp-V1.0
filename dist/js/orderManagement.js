import { _oneTouchOrders } from '../JS/helperFunctions/mongoDB/_oneTouchOrders.js';

document.addEventListener('DOMContentLoaded', () => {
  _oneTouchOrders(); // Fetching customer on DOM load

  document
    .getElementById('oneTouchOrders')
    .addEventListener('click', oneTouchOrders);
});

const oneTouchOrders = (ev) => {
  ev.preventDefault();
  _oneTouchOrders();
};
