import { _deleteOneTouchUser } from '../mongoDB/_deleteOneTouchUser.js';
import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

async function _createOneTouchUser() {
  console.log('Fetching users from db...');
  _spinner(true);
  const URL = '/oneTouch/users';
  const oneTouchUsers = document.querySelector('oneTouchUsers');

  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);

  _spinner(false);
}

export { _createOneTouchUser };
