import { _errorMessage } from '../_errorMessage.js';
import { _sortAddresses } from './_sortAddresses.js';
import { _saveAddressData } from './_saveAddressData.js';
import { _getBroadbandAvailability } from './_getBroadbandAvailability.js';
import { _spinner } from '../_spinner.js';

async function _getAddressForPostcodeProvided(postcode) {
  console.log('Fetching addresses for postcode provided...');
  _spinner(true, 'Loading Addresses For Provided Postcode...');
  const URL = '/ndg/getAddresses/' + postcode;
  console.log(URL);

  const oneTouchSlider = document.querySelector('#oneTouchSlider');
  const oneTouchBroadbandOrderPageOne = document.querySelector(
    '#oneTouchBroadbandOrderPageOne'
  );
  const orderAddressContainer = document.createElement('div');
  orderAddressContainer.id = 'oneTouchBroadbandOrderPageTwo';
  orderAddressContainer.classList.add('center');

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

    orderAddressContainer.innerHTML = `<div class='alignHorizontally'>
                                        <div class='addressSearchContainer boxContainer backgroundWhite'>
                                          <div class='oneTouchIcon'></div>
                                          <div class='alignHorizontally'>
                                            <div class='fontH4'>Please Choose Address</div>
                                            <div class='fontH2'>Postcode provided: ${postcode}</div>
                                          </div>
                                          <select id="selectedAddress" name="selectedAddress">
                                            <option selected disabled hidden value='selectionID'>Please Choose Your Address</option>
                                            ${content}
                                          </select>
                                          <button id='getBroadbandAvailability' class="btnOneTouch" role="button">
                                            Check Availability
                                          </button>
                                        </div>
                                      <div>`;

    oneTouchSlider.appendChild(orderAddressContainer);
    oneTouchBroadbandOrderPageOne.style.display = 'none';

    // document.getElementById('sliderPageOne').addEventListener('click', () => {
    //   // document.getElementById('orderAddressContainer').style.display = 'none';
    //   // dslFormContainer.style.display = 'block';
    //   // dslFormUserContainer.style.display = 'block';
    //   _errorMessage('Go To Page One', 'success');
    // });
    document
      .getElementById('selectedAddress')
      .addEventListener('change', _saveAddressData);
    document
      .getElementById('getBroadbandAvailability')
      .addEventListener('click', _getBroadbandAvailability);
  } catch (err) {
    console.log(err);
    _errorMessage(err);
  }
}

export { _getAddressForPostcodeProvided };
