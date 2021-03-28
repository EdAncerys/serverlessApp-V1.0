import { _fetchOneTouchCustomersFromDB } from './_fetchOneTouchCustomersFromDB.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _deleteOneTouchCustomer(id, pageName) {
  console.log('Deleting User With ID: ' + id);
  _spinner(true);

  const URL = '/oneTouch/customer';
  const body = {
    id,
  };
  const config = {
    method: 'DELETE',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();

    _fetchOneTouchCustomersFromDB(pageName);

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
