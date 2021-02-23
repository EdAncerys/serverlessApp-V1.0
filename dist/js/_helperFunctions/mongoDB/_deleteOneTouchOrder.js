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

  try {
    const response = await fetch(URL, config);
    if (!response.ok) throw new Error(response);
    const data = await response.json();

    _oneTouchOrders();
    _errorMessage(data.msg, 'success');
    _spinner(false);
    console.log(data);
  } catch (err) {
    console.log(err);
    _errorMessage(err);
    _spinner(false);
  }
}

export { _deleteOneTouchOrder };
