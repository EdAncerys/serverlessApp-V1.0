import { _contactFormTemplate } from '../_contactFormTemplate.js';
import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

const _placeBroadbandOrder = () => {
  console.log('Placing Broadband Order...');
  let errorMessage = document.querySelector('errorMessage');
  _spinner(true);

  localStorage.setItem('customerName', 'customerName');
  localStorage.setItem('customerEmail', 'customerEmail');

  let customerName = localStorage.getItem('customerName');
  let customerEmail = localStorage.getItem('customerEmail');
  let oderSubject =
    'Broadband Order' + ' | Created at: ' + new Date().toLocaleString();

  let sub_premises = localStorage.getItem('sub_premises');
  let premises_name = localStorage.getItem('premises_name');
  let thoroughfare_number = localStorage.getItem('thoroughfare_number');
  let thoroughfare_name = localStorage.getItem('thoroughfare_name');
  let locality = localStorage.getItem('locality');
  let post_town = localStorage.getItem('post_town');
  let county = localStorage.getItem('county');
  let postcode = localStorage.getItem('postcode');
  let district_id = localStorage.getItem('district_id');
  let nad_key = localStorage.getItem('nad_key');

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

  let broadbandName = localStorage.getItem('name');
  let broadbandProvider = localStorage.getItem('provider');
  let broadbandPrice = localStorage.getItem('price');
  let broadbandInstallation = localStorage.getItem('installation');

  let orderAddressSummary = `${order_sub_premises} 
                            ${order_premises_name} 
                            ${order_thoroughfare_number} 
                            ${order_thoroughfare_name} 
                            ${order_locality} 
                            ${order_post_town} 
                            ${order_county} 
                            ${order_postcode} 
                            ${order_district_id} 
                            ${order_nad_key}`;

  let orderBroadbandSummary = `${broadbandName}
                              ${broadbandProvider}
                              ${broadbandPrice}
                              ${broadbandInstallation}`;

  let orderSummary = `<p>${orderAddressSummary}</p>
                      <p>${orderBroadbandSummary}</p>`;

  const URL = '/ndg/contactUs';
  const body = {
    value: oderSubject,
    name: customerName,
    email: customerEmail,
    subject: oderSubject,
    description: _contactFormTemplate(
      'Broadband Order',
      customerName,
      customerEmail,
      oderSubject,
      orderSummary
    ),
  };

  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  fetch(URL, config)
    .then((res) => res.json())
    .then((data) => {
      _spinner(false);
      errorMessage.innerHTML = _errorMessage(
        'Order Submitted Successfully...',
        'success'
      );

      console.log(data);
      console.log('Order Submitted Successfully...');
    })
    .catch((err) => {
      _spinner(false);
      errorMessage.innerHTML = _errorMessage(err);

      console.log('error');
      console.log(err);
    });
};

export { _placeBroadbandOrder };
