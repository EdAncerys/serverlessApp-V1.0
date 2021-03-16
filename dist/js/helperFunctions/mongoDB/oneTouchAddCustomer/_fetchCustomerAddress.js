import { _validatePostcode } from '../../icukBroadband/_validatePostcode.js';
import { _handleErrors } from '../../_handleErrors.js';
import { _customerAddressForPostcodeProvided } from './_customerAddressForPostcodeProvided.js';

const _fetchCustomerAddress = () => {
  console.log('Validating From...');

  let postcode = document.getElementById('postcode').value.replace(/\s/g, '');
  let errors = [];

  console.log(postcode);

  if (!postcode) errors.push({ msg: 'Please enter your postcode' });

  if (!_validatePostcode(postcode) && postcode)
    errors.push({ msg: 'Postcode not valid' });

  if (errors.length > 0) {
    console.log('Postcode not valid...');
    _handleErrors(errors);
  } else {
    _customerAddressForPostcodeProvided(postcode);
  }
};

export { _fetchCustomerAddress };
