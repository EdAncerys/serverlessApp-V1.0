import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

async function _oneTouchSupperUserLogin() {
  console.log('Supper User Login');
  _spinner(true);

  const URL = '/ndg/oneTouchSignup';

  const oneTouchSignUpEmail = document.getElementById('#oneTouchSignUpEmail')
    .value;
  const oneTouchSignUpPassword = document.getElementById(
    '#oneTouchSignUpPassword'
  ).value;
  const oneTouchSignUpConfirmationPassword = document.getElementById(
    '#oneTouchSignUpConfirmationPassword'
  ).value;

  const body = {
    oneTouchSignUpEmail,
    oneTouchSignUpPassword,
    oneTouchSignUpConfirmationPassword,
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
