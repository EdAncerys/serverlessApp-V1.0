import { _oneTouchOrders } from './_oneTouchOrders.js';
import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

async function _deleteOneTouchOrder(id) {
  console.log('Deleting Broadband Order. ID: ' + id);
  _spinner(true);

  const URL = '/oneTouch/orders';
  const body = {
    _id: id,
  };
  const config = {
    method: 'DELETE',
    body: JSON.stringify(body),
  };

  fetch(URL, config)
    .then((res) => res.json())
    .then((data) => {
      _oneTouchOrders();
      _spinner(false);
      _errorMessage(data.msg, 'success');

      console.log(data);
    })
    .catch((err) => {
      _spinner(false);
      _errorMessage(err);

      console.log(err);
    });
}

export { _deleteOneTouchOrder };
