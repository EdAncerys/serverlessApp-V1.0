import { _validatePostcode } from './_validatePostcode.js';
import { _handleErrors } from '../_handleErrors.js';
import { _getAddressForPostcodeProvided } from './_getAddressForPostcodeProvided.js';

const _newOrderPostcodeValidation = () => {
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
    _getAddressForPostcodeProvided(postcode);
  }
};

export { _newOrderPostcodeValidation };
