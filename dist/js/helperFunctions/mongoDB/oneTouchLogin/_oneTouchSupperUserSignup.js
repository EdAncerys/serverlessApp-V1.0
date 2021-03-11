import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _oneTouchSupperUserSignup() {
  console.log('Supper User Signup');
  _spinner(true);

  const URL = '/oneTouch/oneTouchSignUp';

  const oneTouchSignUpEmail = document.querySelector('#oneTouchSignUpEmail')
    .value;
  const oneTouchSignUpPassword = document.querySelector(
    '#oneTouchSignUpPassword'
  ).value;
  const oneTouchSignUpConfirmationPassword = document.querySelector(
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
    _errorMessage(data.msg, 'success');
    _spinner(false);
  } catch (err) {
    console.log(err);
    _errorMessage(err);
    _spinner(false);
  }
}

export { _oneTouchSupperUserSignup };
