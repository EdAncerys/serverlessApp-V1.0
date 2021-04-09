import { _oneTouchUserAuthentication } from '../../../js/helperFunctions/mongoDB/oneTouchLogin/_oneTouchUserAuthentication.js';
import { persistDOMData } from '../../../js/persistDOMData.js';

// _oneTouchUserAuthentication(); // User authentication

const endPoint = location.href.split('/').slice(-1)[0];
persistDOMData(endPoint);

document.querySelector('body').addEventListener('click', (event) => {
  const href = event.target.getAttribute('href');

  if (href) {
    event.preventDefault();
    console.log(event.target);
    console.log(href);

    return;
  }
});
