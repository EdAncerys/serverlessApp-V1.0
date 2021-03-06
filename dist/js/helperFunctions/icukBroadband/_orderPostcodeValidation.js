import { _validatePostcode } from './_validatePostcode.js';
import { _errorMessage } from '../_errorMessage.js';
import { _fetchAddressesForPostcodeProvided } from './_fetchAddressesForPostcodeProvided.js';

const _orderPostcodeValidation = () => {
  console.log('Validating From...');

  let postcode = document
    .getElementById('postcodeBroadband')
    .value.replace(/\s/g, '');
  console.log(postcode);

  if (!postcode) {
    _errorMessage('Please enter your postcode', 'warning');
    return;
  }

  if (!_validatePostcode(postcode) && postcode) {
    _errorMessage('Postcode not valid');
    return;
  }

  _fetchAddressesForPostcodeProvided(postcode);
};

export { _orderPostcodeValidation };
