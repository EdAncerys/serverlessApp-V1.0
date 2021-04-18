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
  const oneTouch = await JSON.parse(sessionStorage.getItem('oneTouch'));
  console.log(oneTouch);
  const oderSubject =
    'oneTouch Broadband Order' +
    ' | Created at: ' +
    new Date().toLocaleString();

  const sub_premises =
    oneTouch.sub_premises === 'null' ? '' : oneTouch.sub_premises;
  const premises_name =
    oneTouch.premises_name === 'null' ? '' : oneTouch.premises_name;
  const thoroughfare_number =
    oneTouch.thoroughfare_number === 'null' ? '' : oneTouch.thoroughfare_number;
  const thoroughfare_name =
    oneTouch.thoroughfare_name === 'null' ? '' : oneTouch.thoroughfare_name;
  const locality = oneTouch.locality === 'null' ? '' : oneTouch.locality;
  const post_town = oneTouch.post_town === 'null' ? '' : oneTouch.post_town;
  const county = oneTouch.county === 'null' ? '' : oneTouch.county;
  const postcode = oneTouch.postcode === 'null' ? '' : oneTouch.postcode;

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
                                    <div>Name: ${oneTouch.name}</div>
                                    <div>Provider: ${oneTouch.provider}</div>
                                    <div>Down Speed: ${oneTouch.likely_down_speed}</div>
                                    <div>Up Speed: ${oneTouch.likely_up_speed}</div>
                                    <div>Price: ${oneTouch.price}</div>
                                    <div>Installation: ${oneTouch.installation}</div>
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
    name: oneTouch.customerFullName,
    email: oneTouch.customerEmail,
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
    _createOneTouchOrder(access_token, oneTouch); // save order to db
    // const saveToDb = await _createOneTouchOrder(access_token, oneTouch); // save order to db
    // console.log(saveToDb);
    // if (!saveToDb.ok) throw new Error(response.statusText);

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
