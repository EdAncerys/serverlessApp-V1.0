import { persistDOMData } from '../../../persistDOMData.js';
import { _validatePostcode } from '../../icukBroadband/_validatePostcode.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _sortAddresses } from '../../icukBroadband/_sortAddresses.js';
import { _spinner } from '../../_spinner.js';

async function _customerAddressForPostcodeProvided() {
  console.log('Fetching addresses for postcode provided...');
  _spinner(true);
  const postcode = document
    .getElementById('installationPostcode')
    .value.replace(/\s/g, '');
  console.log(postcode);

  if (!postcode) {
    _errorMessage('Please provide the postcode!', 'warning');
    _spinner(false);
    return;
  }
  if (!_validatePostcode(postcode)) {
    _errorMessage('Provided postcode not valid!', 'warning');
    _spinner(false);
    return;
  }

  const URL = '/oneTouch/icuk_oneTouchAPI/' + postcode;
  console.log(URL);

  // DOM manipulation
  const userAddressContainer = document.querySelector('#userAddressContainer');
  const userPostcodeContainer = document.querySelector(
    '#userPostcodeContainer'
  );
  const selectAddressContainer = document.createElement('div');
  selectAddressContainer.id = 'selectAddressContainer';

  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);

    let value = 0;
    if (data.message === 'Request failed with status code 403') {
      console.log('IP not whitelisted...');
      _errorMessage('IP not whitelisted');
      _spinner(false);
      return;
    }
    if (data.addresses.length === 0) {
      _errorMessage('Provided postcode not valid');
      _spinner(false);
      return;
    }

    let sortedJASON = _sortAddresses(data, 'thoroughfare_number', true);

    let content = sortedJASON.map((address) => {
      let thoroughfare_number =
        address.thoroughfare_number === null ? '' : address.thoroughfare_number;
      let premises_name =
        address.premises_name === null ? '' : address.premises_name;
      let sub_premises =
        address.sub_premises === null ? '' : address.sub_premises;
      let thoroughfare_name =
        address.thoroughfare_name === null ? '' : address.thoroughfare_name;
      let county = address.county === null ? '' : address.county;
      let postcode = address.postcode;

      value += 1;
      return `<option value="${value}"
                thoroughfare_number="${address.thoroughfare_number}" 
                thoroughfare_name="${address.thoroughfare_name}" 
                premises_name="${address.premises_name}" 
                sub_premises="${address.sub_premises}"
                locality="${address.locality}" 
                post_town="${address.post_town}" 
                county="${address.county}"  
                postcode="${address.postcode}"  
                district_id="${address.district_id}"
                nad_key="${address.nad_key}"    
                >${thoroughfare_number} ${premises_name} ${sub_premises} ${thoroughfare_name} ${county} ${postcode}</option>`;
    });
    _spinner(false);

    selectAddressContainer.innerHTML = `<div class="addCustomerSelectAddressContainer">
                                          <div>
                                            <label for="selectedAddress">Select User Address</label>
                                            <select id="selectedAddress" name="selectedAddress">
                                              <option selected disabled hidden value="userSelection">
                                                Please Choose Your Address
                                              </option>
                                              ${content}
                                            </select>
                                          </div>
                                          <div class='fullWidth'>
                                            <div class="addCustomerSelectAddressNav">
                                              <selectCustomerAddress class="btnOneTouch" role="button">
                                                Select Address
                                              </selectCustomerAddress>
                                              <goPageBack class="btnOneTouch" role="button">
                                                New Search
                                              </goPageBack>
                                            </div>
                                          </div>
                                        </div>`;

    userAddressContainer.appendChild(selectAddressContainer);
    userPostcodeContainer.classList.add('hidden');
    persistDOMData('oneTouchBodyContainer', 'add-customer');
  } catch (err) {
    console.log(err);
    _errorMessage(err);
    _spinner(false);
  }
}

export { _customerAddressForPostcodeProvided };
