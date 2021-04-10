import { _createOneTouchOrder } from '../mongoDB/oneTouchOrders/_createOneTouchOrder.js';
import { persistDOMData } from '../../persistDOMData.js';
import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

async function _placeBroadbandOrder() {
  console.log('Placing Broadband Order...');
  _spinner(true);

  const oneTouchBroadbandOrderPageOne = document.querySelector(
    '#oneTouchBroadbandOrderPageOne'
  );
  const oneTouchBroadbandOrderPageFive = document.querySelector(
    '#oneTouchBroadbandOrderPageFive'
  );

  const access_token = await sessionStorage.getItem('access_token');
  const oneTouchData = await JSON.parse(sessionStorage.getItem('oneTouchData'));
  console.log(oneTouchData);
  const oderSubject =
    'Broadband Order' + ' | Created at: ' + new Date().toLocaleString();

  const sub_premises =
    oneTouchData.sub_premises === 'null' ? '' : oneTouchData.sub_premises;
  const premises_name =
    oneTouchData.premises_name === 'null' ? '' : oneTouchData.premises_name;
  const thoroughfare_number =
    oneTouchData.thoroughfare_number === 'null'
      ? ''
      : oneTouchData.thoroughfare_number;
  const thoroughfare_name =
    oneTouchData.thoroughfare_name === 'null'
      ? ''
      : oneTouchData.thoroughfare_name;
  const locality =
    oneTouchData.locality === 'null' ? '' : oneTouchData.locality;
  const post_town =
    oneTouchData.post_town === 'null' ? '' : oneTouchData.post_town;
  const county = oneTouchData.county === 'null' ? '' : oneTouchData.county;
  const postcode =
    oneTouchData.postcode === 'null' ? '' : oneTouchData.postcode;

  const cssStyle = `
                    margin: 1px 0;
                    padding: 5px 5px;
                    border: 1px solid #e8e9e9;
                    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 30%);
                    `;

  const orderAddressSummary = `<div style=${cssStyle}>
                                ${sub_premises} ${premises_name}  ${thoroughfare_number} ${thoroughfare_name} ${locality} ${post_town} ${county} ${postcode}
                              </div>`;

  const orderBroadbandSummary = `<div style=${cssStyle}>
                                    <div>Name: ${oneTouchData.name}</div>
                                    <div>Provider: ${oneTouchData.provider}</div>
                                    <div>Down Speed: ${oneTouchData.likely_down_speed}</div>
                                    <div>Up Speed: ${oneTouchData.likely_up_speed}</div>
                                    <div>Price: ${oneTouchData.price}</div>
                                    <div>Installation: ${oneTouchData.installation}</div>
                                  </div>`;

  const orderSummary = `<div style=${cssStyle}>
                          <div>
                            <h4>Order Address</h4>
                          </div>
                          <div>${orderAddressSummary}</div>
                          <div>
                            <h4>Selected Broadband Details</h4>
                          </div>
                          <div>${orderBroadbandSummary}</div>
                        </div>`;

  const URL = '/oneTouch/contactUs';
  const body = {
    name: oneTouchData.customerFullName,
    email: oneTouchData.customerEmail,
    subject: oderSubject,
    description: orderSummary,
  };

  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    // const response = await fetch(URL, config); //Send email
    // if (!response.ok) throw new Error(response.statusText);
    // const data = await response.json();
    // console.log(data);

    _createOneTouchOrder(access_token, oneTouchData);
    _spinner(false);
    _errorMessage('Order Submitted Successfully!', 'success');

    oneTouchBroadbandOrderPageFive.classList.add('hidden');
    oneTouchBroadbandOrderPageOne.classList.remove('hidden');
    document.getElementById('postcodeBroadband').value = '';
    const endPoint = location.href.split('/').slice(-1)[0];
    persistDOMData(endPoint);
  } catch (err) {
    console.log(err);
    _errorMessage(err);
    _spinner(false);
  }
}

export { _placeBroadbandOrder };
