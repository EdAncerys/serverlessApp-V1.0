import { _oneTouchUsers } from './_oneTouchUsers.js';
import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

async function _createOneTouchUser() {
  _spinner(true);
  const URL = '/oneTouch/users';
  let fullName = document.getElementById('fullName').value;
  let phoneNumber = document.getElementById('phoneNumber').value;
  let email = document.getElementById('email').value;
  let address = document.getElementById('address').value;
  let postcode = document.getElementById('postcode').value;
  let notes = document.getElementById('notes').value;
  console.log('Adding user. Full Name: ' + fullName);

  const body = {
    fullName,
    phoneNumber,
    email,
    address,
    postcode,
    notes,
  };
  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    const data = await response.json();
    console.log(data);
    if (!response.ok) throw new Error(data.msg);

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

export { _createOneTouchUser };
