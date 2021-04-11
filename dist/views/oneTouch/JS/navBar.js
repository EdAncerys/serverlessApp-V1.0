import { userAuthentication } from './userAuthentication.js';
import { persistDOMData } from '../../../js/persistDOMData.js';

const endPoint = location.href.split('/').slice(-1)[0];
persistDOMData(endPoint);

async function _placeIONOSEmailOrder() {
  console.log('Sending Email via iNOS...');
  // _spinner(true, 'Creating Your Order');
  const URL = '/oneTouch/iONOS';
  const access_token = sessionStorage.getItem('access_token');

  const oderSubject =
    `oneTouch Broadband Order. Created at | ` + new Date().toLocaleString();
  const orderSummary = `Order Summary | ` + new Date().toLocaleString();

  const body = {
    access_token,
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
    // if (!response.ok) throw new Error(response.statusText);
    // const data = await response.json();
    // console.log(data);

    // _createOneTouchOrder(access_token, oneTouchData);
    // _spinner(false);
    // _errorMessage('Order Submitted Successfully!', 'success');
    console.log('Order Submitted Successfully!');
  } catch (err) {
    console.log(err);
    // _errorMessage(err);
    // _spinner(false);
  }
}

document.querySelector('body').addEventListener('click', (event) => {
  const iONOS = event.target.nodeName === 'IONOS';

  let href;
  const hasHref = event.target.getAttribute('href');
  if (hasHref) href = event.target.getAttribute('href').substring(2);

  // console.log(event.target);

  // oneTouch App navigation
  if (href) {
    event.preventDefault();
    userAuthentication(href);
  }

  if (iONOS) {
    _placeIONOSEmailOrder();
    console.log('iONOS');
  }
});
