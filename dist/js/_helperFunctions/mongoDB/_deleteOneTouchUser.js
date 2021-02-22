import { _oneTouchUsers } from './_oneTouchUsers.js';
import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

async function _deleteOneTouchUser(id) {
  console.log('Deleting User. ID: ' + id);
  _spinner(true);

  const URL = '/oneTouch/users';
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

    _oneTouchUsers();
    _errorMessage(data.msg, 'success');
    _spinner(false);
    console.log(data);
  } catch (err) {
    console.log(err);
    _errorMessage(err);
    _spinner(false);
  }
}

export { _deleteOneTouchUser };
