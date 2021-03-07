import { _oneTouchUsers } from '../_oneTouchUsers.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _addOneTouchUserToDB() {
  _spinner(true);
  const URL = '/oneTouch/users';
  const fullName = document.getElementById('fullName').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const email = document.getElementById('email').value;
  const notes = document.getElementById('notes').value;

  console.log('Adding user. Full Name: ' + name);

  const body = {
    name,
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

export { _addOneTouchUserToDB };
