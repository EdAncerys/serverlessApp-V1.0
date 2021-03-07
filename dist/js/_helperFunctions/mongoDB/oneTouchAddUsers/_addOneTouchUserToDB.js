import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _addOneTouchUserToDB() {
  _spinner(true);
  const URL = '/oneTouch/users';

  const userCreated = new Date().toLocaleString();
  const fullName = document.getElementById('fullName').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const email = document.getElementById('email').value;
  const sub_premises = sessionStorage.getItem('sub_premises');
  const premises_name = sessionStorage.getItem('premises_name');
  const thoroughfare_number = sessionStorage.getItem('thoroughfare_number');
  const thoroughfare_name = sessionStorage.getItem('thoroughfare_name');
  const locality = sessionStorage.getItem('locality');
  const post_town = sessionStorage.getItem('post_town');
  const county = sessionStorage.getItem('county');
  const postcode = sessionStorage.getItem('postcode');
  const district_id = sessionStorage.getItem('district_id');
  const nad_key = sessionStorage.getItem('nad_key');
  const notes = document.getElementById('notes').value;

  console.log('Adding user to DB. Full Name: ' + fullName);

  const body = {
    userCreated,
    fullName,
    phoneNumber,
    email,
    sub_premises,
    premises_name,
    thoroughfare_number,
    thoroughfare_name,
    locality,
    post_town,
    county,
    postcode,
    district_id,
    nad_key,
    notes,
  };
  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    const data = await response.json();
    if (!response.ok) throw new Error(data.msg);

    console.log(data);
    sessionStorage.setItem('userAddressValidation', false);
    document.querySelector('#selectionContainer').remove();
    document.querySelector('#userPostcodeContainer').classList.remove('hidden');
    document.querySelector('#postcode').value = '';

    _errorMessage(data.msg, 'success');
    _spinner(false);
  } catch (err) {
    console.log(err);
    _errorMessage(err.msg);
    _spinner(false);
  }
}

export { _addOneTouchUserToDB };
