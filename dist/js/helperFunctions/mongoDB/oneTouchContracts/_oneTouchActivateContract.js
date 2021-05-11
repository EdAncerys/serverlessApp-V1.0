import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _oneTouchActivateContract(oneTouchBroadband) {
  console.log('Activating Broadband Order. ID: ' + oneTouchBroadband._id);
  _spinner(true);

  const URL = '/oneTouch/orders/activateContract';
  const body = {
    oneTouchBroadband,
  };
  const config = {
    method: 'UPDATE',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    const data = await response.json();
    if (!response.ok) throw new Error(data.msg);

    console.log(data);
    _spinner(false);
    _errorMessage(data.msg, 'success');
  } catch (err) {
    console.log(err);
    _errorMessage(err);
    _spinner(false);
  }
}

export { _oneTouchActivateContract };
