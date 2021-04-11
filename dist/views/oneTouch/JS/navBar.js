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
  if (href) {
    event.preventDefault();
    userAuthentication(href);
  }

  if (iONOS) {
    _placeIONOSEmailOrder();
    console.log('iONOS');
  }
});
