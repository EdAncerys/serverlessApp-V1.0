import { _createOneTouchOrder } from '../mongoDB/_createOneTouchOrder.js';
import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

async function _placeBroadbandOrder() {
  console.log('Placing Broadband Order...');
  _spinner(true);

  sessionStorage.setItem('customerName', 'customerName');
  sessionStorage.setItem('customerEmail', 'customerEmail');

  let customerName = sessionStorage.getItem('customerName');
  let customerEmail = sessionStorage.getItem('customerEmail');
  let oderSubject =
    'Broadband Order' + ' | Created at: ' + new Date().toLocaleString();

  let broadband_name = sessionStorage.getItem('name');
  let broadband_provider = sessionStorage.getItem('provider');
  let broadband_likely_down_speed = sessionStorage.getItem('likely_down_speed');
  let broadband_likely_up_speed = sessionStorage.getItem('likely_up_speed');
  let broadband_price = sessionStorage.getItem('price');
  let broadband_installation = sessionStorage.getItem('installation');

  let sub_premises = sessionStorage.getItem('sub_premises');
  let premises_name = sessionStorage.getItem('premises_name');
  let thoroughfare_number = sessionStorage.getItem('thoroughfare_number');
  let thoroughfare_name = sessionStorage.getItem('thoroughfare_name');
  let locality = sessionStorage.getItem('locality');
  let post_town = sessionStorage.getItem('post_town');
  let county = sessionStorage.getItem('county');
  let postcode = sessionStorage.getItem('postcode');
  let district_id = sessionStorage.getItem('district_id');
  let nad_key = sessionStorage.getItem('nad_key');

  let order_sub_premises = sub_premises === 'null' ? '' : sub_premises;
  let order_premises_name = premises_name === 'null' ? '' : premises_name;
  let order_thoroughfare_number =
    thoroughfare_number === 'null' ? '' : thoroughfare_number;
  let order_thoroughfare_name =
    thoroughfare_name === 'null' ? '' : thoroughfare_name;
  let order_locality = locality === 'null' ? '' : locality;
  let order_county = county === 'null' ? '' : county;
  let order_post_town = post_town === 'null' ? '' : post_town;
  let order_postcode = postcode === 'null' ? '' : postcode;
  let order_district_id = district_id === 'null' ? '' : district_id;
  let order_nad_key = nad_key === 'null' ? '' : nad_key;

  let orderAddressSummary = ` ${order_sub_premises}
                              ${order_premises_name}
                              ${order_thoroughfare_number}
                              ${order_thoroughfare_name}
                              ${order_locality}
                              ${order_post_town}
                              ${order_county}
                              ${order_postcode}
                              ${order_district_id}
                              ${order_nad_key}`;

  let orderBroadbandSummary = ` <div>Name: ${broadband_name}</div>
                                <div>Provider: ${broadband_provider}</div>
                                <div>Down Speed: ${broadband_likely_down_speed}</div>
                                <div>Up Speed: ${broadband_likely_up_speed}</div>
                                <div>Price: ${broadband_price}</div>
                                <div>Installation: ${broadband_installation}</div>`;

  let orderSummary = `<div style='color: #5cb85c'>
                        <h4>Order Address</h4>
                        ${orderAddressSummary}
                      </div>
                      <div style='color: #5bc0de'>
                        <h4>broadband Deal</h4>
                        ${orderBroadbandSummary}
                      </div>`;

  const URL = '/ndg/contactUs';
  const body = {
    name: customerName,
    email: customerEmail,
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

    _createOneTouchOrder(
      broadband_name,
      broadband_provider,
      broadband_likely_down_speed,
      broadband_likely_up_speed,
      broadband_price,
      broadband_installation
    );
    _spinner(false);
    _errorMessage('Order Submitted Successfully...', 'success');
  } catch (err) {
    console.log(err);
    _errorMessage(err);
    _spinner(false);
  }
}

export { _placeBroadbandOrder };
