import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _oneTouchSupperUserLogin() {
  console.log('Supper User Login');
  _spinner(true);

  const URL = '/ndg/oneTouchLogin';

  const oneTouchLoginEmail = document.getElementById('#oneTouchLoginEmail')
    .value;
  const oneTouchLoginPassword = document.getElementById(
    '#oneTouchLoginPassword'
  ).value;

  const body = {
    oneTouchLoginEmail,
    oneTouchLoginPassword,
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

    _spinner(false);
  } catch (err) {
    console.log(err);
    _errorMessage(err);
    _spinner(false);
  }
}

export { _oneTouchSupperUserLogin };
