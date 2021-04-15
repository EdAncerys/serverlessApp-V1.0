import { userAuthentication } from './userAuthentication.js';
import { persistDOMData } from '../../../js/persistDOMData.js';

const endPoint = location.href.split('/').slice(-1)[0];
persistDOMData(endPoint);

document.querySelector('body').addEventListener('click', (event) => {
  const iONOS = event.target.nodeName === 'IONOS';

  let href;
  const hasHref = event.target.getAttribute('href');
  if (hasHref) href = event.target.getAttribute('href').substring(2);

  // console.log(event.target);

  // oneTouch App navigation
  if (href && href.includes('.html')) {
    event.preventDefault();
    userAuthentication(href); // Authenticate user on all requests
  }

  if (iONOS) {
    async function email() {
      console.log('iONOS');
      const URL = '/oneTouch/iONOS';
      const body = {
        subject: 'oderSubject',
        description: 'orderSummary',
      };

      const config = {
        method: 'POST',
        body: JSON.stringify(body),
      };

      try {
        const response = await fetch(URL, config); //Send email
        console.log(response);
        if (!response.ok) throw new Error(response.statusText);
      } catch (err) {
        console.log(err);
      }
    }

    email();
  }
});
