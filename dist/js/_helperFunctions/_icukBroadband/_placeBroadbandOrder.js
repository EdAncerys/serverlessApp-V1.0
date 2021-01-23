import { _contactFormTemplate } from '../_contactFormTemplate.js';
import { _successMessage } from '../_successMessage.js';
import { _warningMessage } from '../_warningMessage.js';
import { _spinner } from '../_spinner.js';

const _placeBroadbandOrder = () => {
  console.log('Placing Broadband Order...');
  _spinner(true);
  let customerName = 'Name';
  let customerEmail = 'Email';
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
    customerName,
    customerEmail,
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
      _handleSubmission();

      console.log(data);
      console.log('Order Placed successfully...');
    })
    .catch((err) => {
      let msg = document.querySelector('msg');
      _spinner(false);
      msg.innerHTML = _warningMessage(err);

      console.log('error');
      console.log(err);
    });
};

const _handleSubmission = () => {
  const msg = document.querySelector('thankYou');
  const formContainer = document.getElementById('form');
  const broadbandAvailabilityContainer = document.getElementById(
    'broadbandAvailabilityContainer'
  );
  formContainer.style.display = 'none';
  broadbandAvailabilityContainer.style.display = 'none';
  msg.innerHTML = _successMessage('Order Been Placed successfully');

  setTimeout(() => {
    formContainer.style.display = 'block';
    broadbandAvailabilityContainer.style.display = 'block';
    msg.innerHTML = '';
  }, 3000);
};

export { _placeBroadbandOrder };
