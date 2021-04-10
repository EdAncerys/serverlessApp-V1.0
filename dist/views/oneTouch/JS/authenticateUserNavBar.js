import { _oneTouchUserAuthentication } from '../../../js/helperFunctions/mongoDB/oneTouchLogin/_oneTouchUserAuthentication.js';
import { persistDOMData } from '../../../js/persistDOMData.js';

const endPoint = location.href.split('/').slice(-1)[0];
persistDOMData(endPoint);

document.querySelector('body').addEventListener('click', (event) => {
  let href;
  const hasHref = event.target.getAttribute('href');
  if (hasHref) href = event.target.getAttribute('href').substring(2);

  // console.log(event.target);

  // oneTouch App navigation
  if (href) {
    event.preventDefault();
    // _oneTouchUserAuthentication(href); // User authentication

    async function userAuthentication() {
      console.log('User Authentication middleware');

      const URL = '/oneTouch/oneTouchUserAuthentication';
      const access_token = sessionStorage.getItem('access_token');

      const body = {
        access_token,
      };

      const config = {
        method: 'POST',
        body: JSON.stringify(body),
      };

      try {
        const response = await fetch(URL, config);
        if (!response.ok) throw new Error(response.statusText);

        if (response.redirected) {
          sessionStorage.clear();
          window.location.replace(response.url);
          return;
        }

        window.location.replace(`/views/oneTouch/${href}`);

        return;
      } catch (err) {
        console.log(err);

        return;
      }
    }
    userAuthentication();
  }

  async function _placeIONOSEmailOrder() {
    console.log('Sending Email via iNOS...');
    const URL = '/oneTouch/iONOS';

    const oderSubject = `Order oderSubject | ` + new Date().toLocaleString();
    const orderSummary = `Order Summary | ` + new Date().toLocaleString();

    const body = {
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
});
