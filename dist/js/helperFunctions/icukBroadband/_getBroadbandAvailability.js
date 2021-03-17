import { persistDOMData } from '../../persistDOMData.js';
import { _errorMessage } from '../_errorMessage.js';
import { _sortBroadbandData } from './_sortBroadbandData.js';
import { _spinner } from '../_spinner.js';

async function _getBroadbandAvailability() {
  console.log('Getting Broadband Availability...');
  _spinner(true);

  const URL = '/ndg/broadbandAvailability';
  const dropDown = document.getElementById('selectedAddress');
  let validateInput = '';
  if (dropDown)
    validateInput = document.getElementById('selectedAddress').value;
  // Removing user previous data
  const removeData = document.querySelector('#oneTouchBroadbandOrderPageThree');
  if (removeData) removeData.remove();

  const oneTouchSlider = document.querySelector('#oneTouchSlider');
  const oneTouchBroadbandOrderPageTwo = document.querySelector(
    '#oneTouchBroadbandOrderPageTwo'
  );
  const oneTouchBroadbandAvailability = document.createElement('div');
  oneTouchBroadbandAvailability.id = 'oneTouchBroadbandOrderPageThree';

  if (validateInput === 'selectionID') {
    _spinner(false);
    _errorMessage('Please Choose Address', 'warning');
    return;
  }

  let body = {
    sub_premises: sessionStorage.getItem('sub_premises'),
    premises_name: sessionStorage.getItem('premises_name'),
    thoroughfare_number: sessionStorage.getItem('thoroughfare_number'),
    thoroughfare_name: sessionStorage.getItem('thoroughfare_name'),
    locality: sessionStorage.getItem('locality'),
    post_town: sessionStorage.getItem('post_town'),
    county: sessionStorage.getItem('county'),
    postcode: sessionStorage.getItem('postcode'),
    district_id: sessionStorage.getItem('district_id'),
    nad_key: sessionStorage.getItem('nad_key'),
  };
  console.log(body);

  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    const data = await response.json();
    console.log(data);

    let orderData = '';

    if (data.name === 'Error') {
      console.log('Error');
      _errorMessage(
        `Broadband not available for address provided. ${data.message}`,
        'warning'
      );
      _spinner(false);
      return;
    }

    _sortBroadbandData(data, 'name', true).map((order) => {
      orderData += `<div class="boxContainer backgroundLG03 broadbandDataContainerHover fontH2">
                          <div class="broadbandDataContainer">
                            <div class="tableCell">${order.name}</div>
                            <div class="tableCell">${order.likely_down_speed}</div>
                            <div class="tableCell">${order.likely_up_speed}</div>
                            <div class="tableCell">${order.price}</div>
                            <div class="tableCell">${order.installation}</div>
                            <div class="tableCell">
                            <div class='center'>
                              <selectOrder name='${order.name}' 
                                              provider='${order.provider}' 
                                              likely_down_speed='${order.likely_down_speed}' 
                                              likely_up_speed='${order.likely_up_speed}' 
                                              price='${order.price}' 
                                              installation='${order.installation}' 
                                              class="btnB01" role="button">
                                Select
                              </selectOrder>
                            </div>
                          </div>
                          </div>
                        </div>`;
    });

    oneTouchBroadbandAvailability.innerHTML = `<div class='alignHorizontally'>
                                                    <div class="boxContainer broadbandDataContainer backgroundWhite fontH3">
                                                      <div class="tableCell">Supplier</div>
                                                      <div class="tableCell">Download</div>
                                                      <div class="tableCell">Upload</div>
                                                      <div class="tableCell">Price</div>
                                                      <div class="tableCell">Installation</div>
                                                      <div class="tableCell">Select</div>
                                                    </div>
                                                    ${orderData}
                                                    <div class='sliderNav'>
                                                      <goBackBtn id='pageTwo' class="btnOneTouch btnBack" role="button">
                                                        Go Back
                                                      </goBackBtn>
                                                    </div>
                                                  </div>`;

    _spinner(false);

    oneTouchBroadbandOrderPageTwo.classList.add('hidden');
    oneTouchSlider.appendChild(oneTouchBroadbandAvailability);
    persistDOMData('oneTouchBodyContainer', 'order-new-connection');
  } catch (err) {
    console.log(err);
    _errorMessage(err);
    _spinner(false);
  }
}

const _getAreaBroadbandAvailability = () => {
  const oderPostcode = _handlePostcode(sessionStorage.getItem('postcode'));

  const URL = '/ndg/getAreaBroadbandAvailability/' + oderPostcode;
  console.log(URL);
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      _spinner(false);
      _errorMessage('Area Deal Fallback helper function...', 'warning');
      console.table(data);
    })
    .catch((err) => {
      _spinner(false);
      _errorMessage(
        'Fall back function. woops...something went wrong please try again',
        'warning'
      );

      console.log('error');
      console.log(err);
    });
};

const _handlePostcode = (postcode) => {
  postcode = postcode.replace(/\+|\(|\)|\-|\s/gi, '');
  return postcode;
};

export { _getBroadbandAvailability };
