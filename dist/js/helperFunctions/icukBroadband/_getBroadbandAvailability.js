import { persistDOMData } from '../../persistDOMData.js';
import { _errorMessage } from '../_errorMessage.js';
import { _sortBroadbandData } from './_sortBroadbandData.js';
import { _spinner } from '../_spinner.js';

async function _getBroadbandAvailability() {
  console.log('Getting Broadband Availability...');
  _spinner(true);

  const URL = '/oneTouch/icUK/broadbandAvailability';
  const dropDown = document.getElementById('selectedAddress');
  let validateInput = '';
  if (dropDown)
    validateInput = document.getElementById('selectedAddress').value;
  // Removing user previous data
  const removeData = document.querySelector('#oneTouchBroadbandOrderPageThree');
  if (removeData) removeData.remove();

  const oneTouchBroadbandContainer = document.querySelector(
    '#oneTouchBroadbandContainer'
  );
  const oneTouchCustomerList = document.querySelector('#oneTouchCustomerList');
  const oneTouchBroadbandAvailability = document.createElement('div');
  oneTouchBroadbandAvailability.id = 'oneTouchBroadbandOrderPageThree';

  if (validateInput === 'selectAddress') {
    _spinner(false);
    _errorMessage('Please Choose Address', 'warning');
    return;
  }

  const oneTouchCustomerData = await JSON.parse(
    sessionStorage.getItem('oneTouchCustomer')
  );
  const oneTouchCustomer = oneTouchCustomerData.oneTouchCustomer;

  const body = {
    sub_premises: oneTouchCustomer.sub_premises,
    premises_name: oneTouchCustomer.premises_name,
    thoroughfare_number: oneTouchCustomer.thoroughfare_number,
    thoroughfare_name: oneTouchCustomer.thoroughfare_name,
    locality: oneTouchCustomer.locality,
    post_town: oneTouchCustomer.post_town,
    county: oneTouchCustomer.county,
    postcode: oneTouchCustomer.postcode,
    district_id: oneTouchCustomer.district_id,
    nad_key: oneTouchCustomer.nad_key,
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

    const sortedBroadbandData = _sortBroadbandData(data, 'name', true);
    sessionStorage.setItem(
      'broadbandAvailability',
      JSON.stringify(sortedBroadbandData)
    );

    let orderData = '';
    let oneTouchOrderNo = 0;

    sortedBroadbandData.map((order) => {
      orderData += `<div class="boxContainer bgGradientSilver  fontH2">
                          <div class="broadbandDataContainer-C6">
                            <div class="tableCell">${order.name}</div>
                            <div class="tableCell">${order.likely_down_speed}</div>
                            <div class="tableCell">${order.likely_up_speed}</div>
                            <div class="tableCell">${order.price}</div>
                            <div class="tableCell">${order.installation}</div>
                            <div class="tableCell">
                            <div class='center'>
                              <selectOrder
                                oneTouchOrderNo='${oneTouchOrderNo}'
                                class="btnB01 bgPrimary" 
                                role="button"
                                >
                                Select
                              </selectOrder>
                            </div>
                          </div>
                          </div>
                        </div>`;
      oneTouchOrderNo += 1; // increment product count
    });

    oneTouchBroadbandAvailability.innerHTML = `<section class="features">
                                                  <div class="flex-container-60">
                                                    <div class="boxContainer broadbandDataContainer-C6 bgWhite fontH3">
                                                      <div class="tableCell">Supplier</div>
                                                      <div class="tableCell">Download</div>
                                                      <div class="tableCell">Upload</div>
                                                      <div class="tableCell">Price</div>
                                                      <div class="tableCell">Installation</div>
                                                      <div class="tableCell">Select</div>
                                                    </div>
                                                    ${orderData}
                                                    <div class='navComponent'>
                                                      <goPageBack id='pageTwo' class="btnOneTouch btnBack" role="button">
                                                        Go Back
                                                      </goPageBack>
                                                    </div>
                                                  </div>
                                                </section>`;

    _spinner(false);

    oneTouchCustomerList.classList.add('hidden');
    oneTouchBroadbandContainer.appendChild(oneTouchBroadbandAvailability);

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
