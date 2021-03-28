import { _validatePostcode } from './_validatePostcode.js';
import { _errorMessage } from '../_errorMessage.js';
import { _fetchAddressesForPostcodeProvided } from './_fetchAddressesForPostcodeProvided.js';

const _newOrderPostcodeValidation = () => {
  console.log('Validating From...');

  let postcode = document.getElementById('postcode').value.replace(/\s/g, '');
  console.log(postcode);

  if (!postcode) {
    _errorMessage('Please enter your postcode');
    return;
  }

  if (!_validatePostcode(postcode) && postcode) {
    _errorMessage('Postcode not valid');
    return;
  }

  _fetchAddressesForPostcodeProvided(postcode);
};

export { _newOrderPostcodeValidation };
