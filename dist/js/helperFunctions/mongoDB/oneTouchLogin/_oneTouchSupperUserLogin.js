import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _oneTouchSupperUserLogin() {
  console.log('Supper User Login');
  _spinner(true, 'Signing in to One Touch portal account');

  const URL = '/oneTouch/oneTouchLogin';

  const oneTouchLoginEmail = document.querySelector('#oneTouchLoginEmail')
    .value;
  const oneTouchLoginPassword = document.querySelector('#oneTouchLoginPassword')
    .value;

  const body = {
    email: oneTouchLoginEmail,
    password: oneTouchLoginPassword,
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
    _errorMessage(data.msg, 'success');
    _spinner(false);
  } catch (err) {
    console.log(err);
    _errorMessage(err);
    _spinner(false);
  }
}

export { _oneTouchSupperUserLogin };
