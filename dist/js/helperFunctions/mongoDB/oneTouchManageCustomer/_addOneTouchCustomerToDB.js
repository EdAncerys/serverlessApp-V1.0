import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _addOneTouchCustomerToDB() {
  _spinner(true);
  const URL = '/oneTouch/customer/addCustomer';

  const access_token = sessionStorage.getItem('access_token');
  const customerCreated = new Date().toLocaleString();

  const customerFullName = document.getElementById('customerFullName').value;
  const customerPhoneNumber = document.getElementById(
    'customerPhoneNumber'
  ).value;
  const customerEmail = document.getElementById('customerEmail').value;
  const customerNotes = document.getElementById('customerNotes').value;

  const companyName = document.getElementById('companyName').value;
  const productType = document.getElementById('productType').value;
  const companyEmail = document.getElementById('companyEmail').value;
  const companyPhoneNumber =
    document.getElementById('companyPhoneNumber').value;
  const accountManager = document.getElementById('accountManager').value;
  const companyRegistration = document.getElementById(
    'companyRegistration'
  ).value;

  const contactName = document.getElementById('contactName').value;
  const contactPhoneNumber =
    document.getElementById('contactPhoneNumber').value;
  const contactEmail = document.getElementById('contactEmail').value;

  const data = JSON.parse(sessionStorage.getItem('selectedAddress'));
  const selectedAddress = data.selectedAddress;

  const sub_premises = selectedAddress.sub_premises;
  const premises_name = selectedAddress.premises_name;
  const thoroughfare_number = selectedAddress.thoroughfare_number;
  const thoroughfare_name = selectedAddress.thoroughfare_name;
  const locality = selectedAddress.locality;
  const post_town = selectedAddress.post_town;
  const county = selectedAddress.county;
  const postcode = selectedAddress.postcode;
  const district_id = selectedAddress.district_id;
  const nad_key = selectedAddress.nad_key;

  console.log('Adding user to DB. Full Name: ' + customerFullName);

  const oneTouchCustomer = {
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

  const body = {
    access_token,
    oneTouchCustomer,
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
    
    clearFormData();

    _errorMessage(data.msg, 'success');
    _spinner(false);
  } catch (error) {
    console.log(error);
    _errorMessage(error);
    _spinner(false);
  }
}

const clearFormData = () => {
  sessionStorage.removeItem('selectedAddress');
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
