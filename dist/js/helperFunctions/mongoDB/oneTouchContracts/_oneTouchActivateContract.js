import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';
import { _oneTouchAllPlacedOrders } from '../oneTouchBroadband/_oneTouchAllPlacedOrders.js';

async function _oneTouchActivateContract() {
  const contractStartDay = document.getElementById('contractStartDay').value;
  const contractEndDay = document.getElementById('contractEndDay').value;
  const contractNotes = document.getElementById('contractNotes').value;

  const oneTouchBroadband = await JSON.parse(
    sessionStorage.getItem('oneTouchBroadband')
  );
  let id;
  if (oneTouchBroadband) id = oneTouchBroadband._id;
  console.log('Activating Broadband Order. ID: ' + id);

  if (!contractStartDay || !contractEndDay) {
    _errorMessage('Please Select Contract Start & End Days', 'warning');
    return;
  }
  _spinner(true);

  oneTouchBroadband.oneTouchBroadband.contractStartDay = contractStartDay;
  oneTouchBroadband.oneTouchBroadband.contractEndDay = contractEndDay;

  await sessionStorage.setItem(
    'oneTouchBroadband',
    JSON.stringify(oneTouchBroadband)
  );

  const URL = '/oneTouch/contract/activateContract';
  const body = {
    oneTouchBroadband,
  };

  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    console.log(response);
    const data = await response.json();
    if (!response.ok) throw new Error(data.msg);

    await _oneTouchAllPlacedOrders();
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
