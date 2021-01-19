

const _handleFormValidation = () => {
  console.log('Validating From...');
  // Clearing containers if contains values
  document.querySelector('msgBroadband').innerHTML = '';
  document.querySelector('broadbandDeals').innerHTML = '';

  let postcode = document.getElementById('postcode').value.replace(/\s/g, '');
  let errors = [];

  console.log(postcode);

  if (!postcode) errors.push({ msg: 'Please enter your postcode' });

  if (!validatePostcode(postcode) && postcode)
    errors.push({ msg: 'Postcode not valid' });

  if (errors.length > 0) {
    console.log('Postcode not valid...');
    handleErrors(errors);
  } else {
    console.log('Postcode valid...');
    oderPostcode = postcode;
    getAddress(postcode);
  }
};

export { _handleFormValidation };
