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
  const oneTouchCustomer = await JSON.parse(
    sessionStorage.getItem('oneTouchCustomer')
  );
  const oneTouchBroadband = await JSON.parse(
    sessionStorage.getItem('oneTouchBroadband')
  );
  console.log(oneTouchCustomer);
  console.log(oneTouchBroadband);

  const oderSubject =
    'oneTouch Broadband Order' +
    ' | Created at: ' +
    new Date().toLocaleString();

  const sub_premises =
    oneTouchCustomer.sub_premises === 'null'
      ? ''
      : oneTouchCustomer.sub_premises;
  const premises_name =
    oneTouchCustomer.premises_name === 'null'
      ? ''
      : oneTouchCustomer.premises_name;
  const thoroughfare_number =
    oneTouchCustomer.thoroughfare_number === 'null'
      ? ''
      : oneTouchCustomer.thoroughfare_number;
  const thoroughfare_name =
    oneTouchCustomer.thoroughfare_name === 'null'
      ? ''
      : oneTouchCustomer.thoroughfare_name;
  const locality =
    oneTouchCustomer.locality === 'null' ? '' : oneTouchCustomer.locality;
  const post_town =
    oneTouchCustomer.post_town === 'null' ? '' : oneTouchCustomer.post_town;
  const county =
    oneTouchCustomer.county === 'null' ? '' : oneTouchCustomer.county;
  const postcode =
    oneTouchCustomer.postcode === 'null' ? '' : oneTouchCustomer.postcode;

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
                                    <div>Name: ${oneTouchBroadband.name}</div>
                                    <div>Provider: ${oneTouchBroadband.provider}</div>
                                    <div>Down Speed: ${oneTouchBroadband.likely_down_speed}</div>
                                    <div>Up Speed: ${oneTouchBroadband.likely_up_speed}</div>
                                    <div>Price: ${oneTouchBroadband.price}</div>
                                    <div>Installation: ${oneTouchBroadband.installation}</div>
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

  const URL = '/oneTouch/gmail';
  const body = {
    access_token,
    name: oneTouchCustomer.customerFullName,
    email: oneTouchCustomer.customerEmail,
    subject: oderSubject,
    description: orderSummary,
  };

  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config); //Send email
    console.log(response);
    if (!response.ok) throw new Error(response.statusText);
    const saveToDb = await _createOneTouchOrder(
      access_token,
      oneTouchCustomer,
      oneTouchBroadband
    ); // save order to db
    console.log(saveToDb);
    if (!saveToDb.ok) throw new Error(response.statusText);

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
