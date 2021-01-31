import { _oneTouchOrders } from '../JS/_helperFunctions/mongoDB/_oneTouchOrders.js';

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('oneTouchOrders')
    .addEventListener('click', oneTouchOrders);
});

const oneTouchOrders = (ev) => {
  ev.preventDefault();
  _oneTouchOrders();
};
