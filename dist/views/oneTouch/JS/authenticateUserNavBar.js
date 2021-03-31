import { _oneTouchUserAuthentication } from '../../../js/helperFunctions/mongoDB/oneTouchLogin/_oneTouchUserAuthentication.js';
import { persistDOMData } from '../../../js/persistDOMData.js';

_oneTouchUserAuthentication(); // User authentication

// Persist user data on reload
const endPoint = location.href.split('/').slice(-1);
sessionStorage.setItem('oneTouchPageName', endPoint);
// const oneTouchDOMBody = sessionStorage.getItem('oneTouchDOMBody') === null;
// const oneTouchPageName =
//   sessionStorage.getItem('oneTouchPageName') === endPoint;

// if (!oneTouchDOMBody && oneTouchPageName) {
//   console.log('Page Reload');
//   const oneTouchDOMBody = document.querySelector('#oneTouchBodyContainer');
//   oneTouchDOMBody.innerHTML = sessionStorage.getItem('oneTouchDOMBody');
// }
// if (oneTouchDOMBody && !oneTouchPageName) {
//   console.log('Save DOM data');
//   persistDOMData('oneTouchBodyContainer', endPoint);
// }
