import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _oneTouchSuperUserLogin() {
  console.log('Supper User Login');
  _spinner(true, 'Signing in to One Touch portal account');

  const URL = '/oneTouch/oneTouchLogin';

  const oneTouchLoginEmail = document.querySelector('#oneTouchLoginEmail')
    .value;
  const oneTouchLoginPassword = document.querySelector('#oneTouchLoginPassword')
    .value;

  if (oneTouchLoginEmail === '' || oneTouchLoginPassword === '') {
    _spinner(false);
    _errorMessage('Please fill in all required fields', 'warning');
    return;
  }

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
    console.log(data);
    if (!response.ok) throw new Error(data.msg);

    await sessionStorage.setItem('access_token', data.access_token); // Storing access_token in sessions
    _spinner(false);
    window.location.replace('/views/oneTouch/index.html');
  } catch (error) {
    console.log(error);
    _errorMessage(error);
    _spinner(false);
  }
}

export { _oneTouchSuperUserLogin };
