import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _deleteOneTouchCustomer(id) {
  console.log('Deleting User With ID: ' + id);
  _spinner(true);

  const URL = '/oneTouch/customer/deleteCustomer';
  const access_token = sessionStorage.getItem('access_token');

  const body = {
    id,
    access_token,
  };
  const config = {
    method: 'DELETE',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();

    _errorMessage(data.msg, 'success');
    _spinner(false);
    console.log(data);
  } catch (err) {
    console.log(err);

    _errorMessage(`User Not Found ` + err, 'warning');
    _spinner(false);
  }
}

export { _deleteOneTouchCustomer };
