import { _errorMessage } from '../_errorMessage.js';
import { _sortBroadbandData } from './_sortBroadbandData.js';
import { _handleBroadbandSelection } from './_handleBroadbandSelection.js';
import { _manageOrderData } from './_manageOrderData.js';
import { _spinner } from '../_spinner.js';

async function _getBroadbandAvailability() {
  console.log('Getting Broadband Availability...');
  _spinner(true);

  const URL = '/ndg/broadbandAvailability';
  const validateInput = document.getElementById('selectedAddress').value;
  const oneTouchOrderSlider = document.querySelector('#oneTouchOrderSlider');

  const oneTouchBoradbandDeals = document.createElement('div');
  oneTouchBoradbandDeals.id = 'oneTouchBoradbandDeals';

  if (validateInput === 'selectionID') {
    _spinner(false);
    _errorMessage('Please Choose Address', 'warning');
  } else {
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
      if (data.length === 0) {
        oneTouchBoradbandDeals.innerHTML = `<div class='umContainer alignHorizontally noOrders'>
                                              No Broadband Data Provided!
                                            </div>`;
      } else {
        _sortBroadbandData(data, 'name', true).map((order) => {
          orderData += `<div class="boxContainer broadbandDataContainerHover">
                          <div class="broadbandDataContainer">
                            <div class="tableCell">${order.name}</div>
                            <div class="tableCell">${order.provider}</div>
                            <div class="tableCell">${order.likely_down_speed}</div>
                            <div class="tableCell">${order.likely_up_speed}</div>
                            <div class="tableCell">${order.price}</div>
                            <div class="tableCell">${order.installation}</div>
                            <div class="tableCell">
                              <btnSelectOrder name='${data.name}' 
                                              provider='${data.provider}' 
                                              likely_down_speed='${data.likely_down_speed}' 
                                              likely_up_speed='${data.likely_up_speed}' 
                                              price='${data.price}' 
                                              installation='${data.installation}' 
                                              class="btnB01" role="button">
                                Select
                              </btnSelectOrder>
                          </div>
                          </div>
                        </div>`;
        });

        oneTouchBoradbandDeals.innerHTML = `<div class='umContainer'>
                                              <div class="boxContainer broadbandDataContainer">
                                                <div class="tableCell">Supplier</div>
                                                <div class="tableCell">Provider</div>
                                                <div class="tableCell">Download</div>
                                                <div class="tableCell">Upload</div>
                                                <div class="tableCell">Price</div>
                                                <div class="tableCell">Installation</div>
                                                <div class="tableCell">Select Deal</div>
                                              </div>
                                              ${orderData}
                                            </div>
                                              <div class='sliderNavBtn'>
                                              <div id='sliderPageTwo' class="btnB01">Go Back</div>
                                              <div></div>
                                            </div>`;
      }

      _spinner(false);

      document.getElementById('orderAddressContainer').style.display = 'none';
      oneTouchOrderSlider.appendChild(oneTouchBoradbandDeals);

      document.getElementById('sliderPageTwo').addEventListener('click', () => {
        _errorMessage('Go To Page Two', 'success');
      });

      document.querySelector('body').addEventListener('click', (event) => {
        const btnSelectOrder = event.target.nodeName === 'BTNSELECTORDER';

        if (!btnSelectOrder) {
          return;
        }
        console.log('select');
        _manageOrderData(
          event.target.getAttribute('name'),
          event.target.getAttribute('provider'),
          event.target.getAttribute('likely_down_speed'),
          event.target.getAttribute('likely_up_speed'),
          event.target.getAttribute('price'),
          event.target.getAttribute('installation')
        );
      });
    } catch (err) {
      console.log(err);
      _errorMessage(err);
    }
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
