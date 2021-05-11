import { _createOneTouchBroadband } from '../mongoDB/oneTouchBroadband/_createOneTouchBroadband.js';
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
  const oneTouchCustomerData = await JSON.parse(
    sessionStorage.getItem('oneTouchCustomer')
  );
  const oneTouchCustomer = oneTouchCustomerData.oneTouchCustomer;
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

  const orderAddressSummary = `<div class='boxContainer broadbandDataContainer-C6 bgWhite fontH3'>
                                ${sub_premises} ${premises_name}  ${thoroughfare_number} ${thoroughfare_name} ${locality} ${post_town} ${county} ${postcode}
                              </div>`;

  const orderBroadbandSummary = `<div class='boxContainer broadbandDataContainer-C6 bgWhite fontH3'>
                                    <div class='tableCell'>Name: ${oneTouchBroadband.name}</div>
                                    <div class='tableCell'>Provider: ${oneTouchBroadband.provider}</div>
                                    <div class='tableCell'>Down Speed: ${oneTouchBroadband.likely_down_speed}</div>
                                    <div class='tableCell'>Up Speed: ${oneTouchBroadband.likely_up_speed}</div>
                                    <div class='tableCell'>Price: ${oneTouchBroadband.price}</div>
                                    <div class='tableCell'>Installation: ${oneTouchBroadband.installation}</div>
                                  </div>`;

  const orderSummary = `<div class='boxContainer broadbandDataContainer-C6 bgWhite fontH3'>
                          <div>
                            <h4>Order Address</h4>
                          </div>
                          <div class='tableCell'>${orderAddressSummary}</div>
                          <div class='tableCell'>
                            <h4>Selected Broadband Details</h4>
                          </div>
                          <div class='tableCell'>${orderBroadbandSummary}</div>
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
    const saveToDb = await _createOneTouchBroadband(
      access_token,
      oneTouchCustomerData,
      oneTouchBroadband
    ); // save order to db
    console.log(saveToDb);
    if (!saveToDb.ok) throw new Error(response.statusText);

    _spinner(false);
    _errorMessage('Order Submitted Successfully!', 'success');

    oneTouchBroadbandOrderPageFive.classList.add('hidden');
    oneTouchBroadbandOrderPageOne.classList.remove('hidden');
    document.getElementById('postcodeBroadband').value = '';

    //removing Data from sessions
    sessionStorage.removeItem('oneTouchCustomer');
    sessionStorage.removeItem('oneTouchBroadband');

    const endPoint = location.href.split('/').slice(-1)[0];
    persistDOMData(endPoint);
  } catch (err) {
    console.log(err);
    _errorMessage(err);
    _spinner(false);
  }
}

export { _placeBroadbandOrder };
