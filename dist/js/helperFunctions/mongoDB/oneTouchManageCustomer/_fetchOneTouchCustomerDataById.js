import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _fetchOneTouchCustomerDataById(id) {
  console.log('Fetching Customer Data...');
  _spinner(true, 'Loading Customer Information...');
  const URL = '/oneTouch/customer';

  const body = {
    findOneById: id,
  };
  console.log(body);

  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    const data = await response.json();
    if (!response.ok) throw new Error(data.msg);
    console.log(data);

    _spinner(false);
    return data;
  } catch (err) {
    console.log(err);
    _spinner(false);
    _errorMessage(err);

    return err;
  }
}

export { _fetchOneTouchCustomerDataById };
