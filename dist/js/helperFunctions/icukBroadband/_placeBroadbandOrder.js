import { _createOneTouchOrder } from '../mongoDB/_createOneTouchOrder.js';
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

  const oneTouchData = JSON.parse(sessionStorage.getItem('oneTouchData'));
  const oderSubject =
    'Broadband Order' + ' | Created at: ' + new Date().toLocaleString();

  const sub_premises =
    mergedData.sub_premises === 'null' ? '' : mergedData.sub_premises;
  const premises_name =
    mergedData.premises_name === 'null' ? '' : mergedData.premises_name;
  const thoroughfare_number =
    mergedData.thoroughfare_number === 'null'
      ? ''
      : mergedData.thoroughfare_number;
  const thoroughfare_name =
    mergedData.thoroughfare_name === 'null' ? '' : mergedData.thoroughfare_name;
  const locality = mergedData.locality === 'null' ? '' : mergedData.locality;
  const post_town = mergedData.post_town === 'null' ? '' : mergedData.post_town;
  const county = mergedData.county === 'null' ? '' : mergedData.county;
  const postcode = mergedData.postcode === 'null' ? '' : mergedData.postcode;

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

  const URL = '/ndg/contactUs';
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
    const response = await fetch(URL, config);
    const data = await response.json();
    console.log(data);

    _createOneTouchOrder(oneTouchData);
    _spinner(false);
    _errorMessage('Order Submitted Successfully!', 'success');

    oneTouchBroadbandOrderPageFive.classList.add('hidden');
    oneTouchBroadbandOrderPageOne.classList.remove('hidden');
    document.getElementById('postcode').value = '';
    persistDOMData('oneTouchBodyContainer', 'order-new-connection');
  } catch (err) {
    console.log(err);
    _errorMessage(err);
    _spinner(false);
  }
}

export { _placeBroadbandOrder };
