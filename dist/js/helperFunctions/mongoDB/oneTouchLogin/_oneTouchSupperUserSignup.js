import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _oneTouchSupperUserSignup() {
  console.log('Supper User Signup');
  _spinner(true);

  const URL = '/ndg/oneTouchSignup';

  const oneTouchSignupEmail = document.querySelector('#oneTouchSignupEmail')
    .value;
  const oneTouchSignupPassword = document.querySelector(
    '#oneTouchSignupPassword'
  ).value;
  const oneTouchSignupConfirmationPassword = document.querySelector(
    '#oneTouchSignupConfirmationPassword'
  ).value;

  const body = {
    oneTouchSignupEmail,
    oneTouchSignupPassword,
    oneTouchSignupConfirmationPassword,
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

export { _oneTouchSupperUserSignup };
