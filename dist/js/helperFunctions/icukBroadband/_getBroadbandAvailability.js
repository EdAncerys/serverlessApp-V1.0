import { persistDOMData } from '../../persistDOMData.js';
import { _errorMessage } from '../_errorMessage.js';
import { _sortBroadbandData } from './_sortBroadbandData.js';
import { _spinner } from '../_spinner.js';

async function _getBroadbandAvailability() {
  console.log('Getting Broadband Availability...');
  _spinner(true);

  const URL = '/oneTouch/icuk_oneTouchAPI/';
  const dropDown = document.getElementById('selectedAddress');
  let validateInput = '';
  if (dropDown)
    validateInput = document.getElementById('selectedAddress').value;
  // Removing user previous data
  const removeData = document.querySelector('#oneTouchBroadbandOrderPageThree');
  if (removeData) removeData.remove();

  const oneTouchBrodbandContainer = document.querySelector(
    '#oneTouchBrodbandContainer'
  );
  const oneTouchBroadbandOrderPageTwo = document.querySelector(
    '#oneTouchBroadbandOrderPageTwo'
  );
  const oneTouchBroadbandAvailability = document.createElement('div');
  oneTouchBroadbandAvailability.id = 'oneTouchBroadbandOrderPageThree';

  if (validateInput === 'selectAddress') {
    _spinner(false);
    _errorMessage('Please Choose Address', 'warning');
    return;
  }

  const oneTouchData = await JSON.parse(sessionStorage.getItem('oneTouchData'));

  const body = {
    sub_premises: oneTouchData.sub_premises,
    premises_name: oneTouchData.premises_name,
    thoroughfare_number: oneTouchData.thoroughfare_number,
    thoroughfare_name: oneTouchData.thoroughfare_name,
    locality: oneTouchData.locality,
    post_town: oneTouchData.post_town,
    county: oneTouchData.county,
    postcode: oneTouchData.postcode,
    district_id: oneTouchData.district_id,
    nad_key: oneTouchData.nad_key,
  };
  console.log(body);

  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    console.log(data);

    let orderData = '';

    _sortBroadbandData(data, 'name', true).map((order) => {
      const oneTouchOrderData = JSON.stringify(order);

      orderData += `<div class="boxContainer bgGradientSilver broadbandDataContainerHover fontH2">
                          <div class="broadbandDataContainer">
                            <div class="tableCell">${order.name}</div>
                            <div class="tableCell">${order.likely_down_speed}</div>
                            <div class="tableCell">${order.likely_up_speed}</div>
                            <div class="tableCell">${order.price}</div>
                            <div class="tableCell">${order.installation}</div>
                            <div class="tableCell">
                            <div class='center'>
                              <selectOrder
                                oneTouchOrderData='${oneTouchOrderData}'
                                class="btnB01" 
                                role="button"
                                >
                                Select
                              </selectOrder>
                            </div>
                          </div>
                          </div>
                        </div>`;
    });

    oneTouchBroadbandAvailability.innerHTML = `<div class='alignHorizontally'>
                                                    <div class="boxContainer broadbandDataContainer bgWhite fontH3">
                                                      <div class="tableCell">Supplier</div>
                                                      <div class="tableCell">Download</div>
                                                      <div class="tableCell">Upload</div>
                                                      <div class="tableCell">Price</div>
                                                      <div class="tableCell">Installation</div>
                                                      <div class="tableCell">Select</div>
                                                    </div>
                                                    ${orderData}
                                                    <div class='sliderNav'>
                                                      <goPageBack id='pageTwo' class="btnOneTouch btnBack" role="button">
                                                        Go Back
                                                      </goPageBack>
                                                    </div>
                                                  </div>`;

    _spinner(false);

    oneTouchBroadbandOrderPageTwo.classList.add('hidden');
    oneTouchBrodbandContainer.appendChild(oneTouchBroadbandAvailability);
    const endPoint = location.href.split('/').slice(-1)[0];
    persistDOMData(endPoint);
  } catch (err) {
    console.log(err);
    _errorMessage(
      `Broadband not available for address provided. ` + err,
      'warning'
    );
    _spinner(false);
  }
}

export { _getBroadbandAvailability };
