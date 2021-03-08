import { _fetchOneTouchUsersFromDB } from './_helperFunctions/mongoDB/oneTouchManageUsers/_fetchOneTouchUsersFromDB.js';
import { _errorMessage } from './_helperFunctions/_errorMessage.js';

document.addEventListener('DOMContentLoaded', () => {
  const oneTouchDOMBody = sessionStorage.getItem('oneTouchDOMBody') === null;
  const oneTouchBodyName =
    sessionStorage.getItem('oneTouchBodyName') === 'manage-users';

  console.log(oneTouchDOMBody, oneTouchBodyName);
  if (oneTouchDOMBody || !oneTouchBodyName) {
    fetchOneTouchUsersFromDB();
  }
  if (!oneTouchDOMBody && oneTouchBodyName) {
    console.log('Page Reloaded');
    const oneTouchDOMBody = document.querySelector('#oneTouchBodyContainer');
    oneTouchDOMBody.innerHTML = sessionStorage.getItem('oneTouchDOMBody');
  }
});

const fetchOneTouchUsersFromDB = () => {
  _fetchOneTouchUsersFromDB();
};

document.querySelector('body').addEventListener('click', (event) => {
  const selectUserAddress = event.target.nodeName === 'SELECTUSERADDRESS';
  const goBackBtn = event.target.nodeName === 'GOBACKBTN';

  // console.log(event.target);
  if (selectUserAddress) {
    const userSelection = document.getElementById('selectedAddress').value;
    if (userSelection !== 'userSelection') {
      _handleUserAddressSelection();
    } else {
      _errorMessage('Please Select User Address From The List Provided!');
    }
    return;
  }
  if (goBackBtn) {
    document.querySelector('#selectAddressContainer').remove();
    document.querySelector('#userPostcodeContainer').classList.remove('hidden');
    document.querySelector('#postcode').value = '';
    return;
  }
});
