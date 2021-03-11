import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

async function _getBroadbandAvailability() {
  console.log('Supper User Login');
  _spinner(true);

  const URL = '/ndg/oneTouchLogin';

  const email = document.getElementById('#email').value;
  const password = document.getElementById('#password').value;
  console.log(email, password);

  let body = {
    email,
    password,
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

    oneTouchBroadbandOrderPageTwo.classList.add('hidden');
    oneTouchSlider.appendChild(oneTouchBroadbandAvailability);
    persistDOMData('oneTouchBodyContainer', 'order-new-connection');
  } catch (err) {
    console.log(err);
    _errorMessage(err);
    _spinner(false);
  }
}

const _getAreaBroadbandAvailability = () => {
  const oderPostcode = _handlePostcode(sessionStorage.getItem('postcode'));

  const URL = '/ndg/getAreaBroadbandAvailability/' + oderPostcode;
  console.log(URL);
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      _spinner(false);
      _errorMessage('Area Deal Fallback helper function...', 'warning');
      console.table(data);
    })
    .catch((err) => {
      _spinner(false);
      _errorMessage(
        'Fall back function. woops...something went wrong please try again',
        'warning'
      );

      console.log('error');
      console.log(err);
    });
};

const _handlePostcode = (postcode) => {
  postcode = postcode.replace(/\+|\(|\)|\-|\s/gi, '');
  return postcode;
};

export { _getBroadbandAvailability };
