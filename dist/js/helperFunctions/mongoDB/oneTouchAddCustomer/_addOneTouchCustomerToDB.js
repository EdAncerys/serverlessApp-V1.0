import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _addOneTouchCustomerToDB() {
  _spinner(true);
  const URL = '/oneTouch/customer';

  const customerCreated = new Date().toLocaleString();
  const customerFullName = document.getElementById('customerFullName').value;
  const customerPhoneNumber = document.getElementById('customerPhoneNumber')
    .value;
  const customerEmail = document.getElementById('customerEmail').value;
  const customerNotes = document.getElementById('customerNotes').value;

  const companyName = document.getElementById('companyName').value;
  const productType = document.getElementById('productType').value;
  const companyEmail = document.getElementById('companyEmail').value;
  const companyPhoneNumber = document.getElementById('companyPhoneNumber')
    .value;
  const accountManager = document.getElementById('accountManager').value;
  const companyRegistration = document.getElementById('companyRegistration')
    .value;

  const contactName = document.getElementById('contactName').value;
  const contactPhoneNumber = document.getElementById('contactPhoneNumber')
    .value;
  const contactEmail = document.getElementById('contactEmail').value;

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

  console.log('Adding user to DB. Full Name: ' + customerFullName);

  const body = {
    customerCreated,
    customerFullName,
    customerPhoneNumber,
    customerEmail,
    companyName,
    productType,
    companyEmail,
    companyPhoneNumber,
    accountManager,
    companyRegistration,
    contactName,
    contactPhoneNumber,
    contactEmail,
    customerNotes,
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
    _domDataManipulation();

    _errorMessage(data.msg, 'success');
    _spinner(false);
  } catch (err) {
    console.log(err);
    _errorMessage(err);
    _spinner(false);
  }
}

const _domDataManipulation = () => {
  sessionStorage.setItem('userAddressValidation', false);
  document.querySelector('#selectionContainer').remove();
  document.querySelector('#userPostcodeContainer').classList.remove('hidden');

  document.querySelector('#customerFullName').value = '';
  document.querySelector('#customerPhoneNumber').value = '';
  document.querySelector('#customerEmail').value = '';

  document.querySelector('#companyName').value = '';
  document.querySelector('#productType').value = '';
  document.querySelector('#companyEmail').value = '';
  document.querySelector('#companyPhoneNumber').value = '';
  document.querySelector('#accountManager').value = '';
  document.querySelector('#companyRegistration').value = '';

  document.querySelector('#contactName').value = '';
  document.querySelector('#contactPhoneNumber').value = '';
  document.querySelector('#contactEmail').value = '';

  document.querySelector('#installationPostcode').value = '';
  document.querySelector('#customerNotes').value = '';
};

export { _addOneTouchCustomerToDB };
