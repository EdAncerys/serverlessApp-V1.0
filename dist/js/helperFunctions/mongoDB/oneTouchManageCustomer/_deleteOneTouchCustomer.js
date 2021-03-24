import { _fetchAllOneTouchCustomers } from './_fetchAllOneTouchCustomers.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _deleteOneTouchCustomer(_id, customerEmail, pageName) {
  console.log('Deleting User With ID: ' + _id);
  _spinner(true);

  const URL = '/oneTouch/customer';
  const body = {
    _id,
    customerEmail,
  };
  const config = {
    method: 'DELETE',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    if (!response.ok) throw new Error(response);
    const data = await response.json();

    _fetchAllOneTouchCustomers(pageName);
    _errorMessage(data.msg, 'success');
    _spinner(false);
    console.log(data);
  } catch (err) {
    console.log(err);
    _errorMessage(err);
    _spinner(false);
  }
}

export { _deleteOneTouchCustomer };
