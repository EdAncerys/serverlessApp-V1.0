import { _validateEmail } from '../../_validateEmail.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _oneTouchSupperUserSignup() {
  console.log('Supper User Signup');
  _spinner(true, 'Creating One Touch portal account');

  const URL = '/oneTouch/oneTouchSignUp';

  const oneTouchSignUpEmail = document.querySelector('#oneTouchSignUpEmail')
    .value;
  const oneTouchSignUpPassword = document.querySelector(
    '#oneTouchSignUpPassword'
  ).value;
  const oneTouchSignUpConfirmationPassword = document.querySelector(
    '#oneTouchSignUpConfirmationPassword'
  ).value;

  if (!_validateEmail(oneTouchSignUpEmail)) {
    _errorMessage('Email not valid!');
    _spinner(false);
    return;
  }
  if (oneTouchSignUpPassword.length < 6) {
    _errorMessage('Passwords must be at least 6 characters in length!');
    _spinner(false);
    return;
  }
  if (oneTouchSignUpPassword !== oneTouchSignUpConfirmationPassword) {
    _errorMessage('Passwords do not match!');
    _spinner(false);
    return;
  }

  const body = {
    email: oneTouchSignUpEmail,
    password: oneTouchSignUpPassword,
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

export { _oneTouchSupperUserSignup };
