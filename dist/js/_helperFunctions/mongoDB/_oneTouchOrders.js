import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

async function _oneTouchOrders() {
  console.log('Fetching all orders...');
  _spinner(true);
  const URL = '/oneTouch/orders';
  const oneTouchOrders = document.querySelector('oneTouchOrders');

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      _spinner(false);
      let content = data.map((order) => {
        return `<p>ID: ${order._id}</p>
                <p>Name: ${order.name}</p>
                <p>username: ${order.likely_down_speed}</p>
                <p>phone: ${order.likely_up_speed}</p>
                <p>phone: ${order.price}</p>
                <p>email: ${order.installation}</p>`;
      });
      oneTouchOrders.innerHTML = `<h4>All Registered Orders</h4>
                                  <div>${content}</div>`;

      console.log(data);
    })
    .catch((err) => {
      _spinner(false);
      _errorMessage(err);
      console.log(err);
    });
}

export { _oneTouchOrders };
