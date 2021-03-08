import { _errorMessage } from './_helperFunctions/_errorMessage.js';

document.addEventListener('DOMContentLoaded', () => {
  fetchOneTouchUsersFromDB();
});

const fetchOneTouchUsersFromDB = () => {
  console.log('fetching users');
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

document.querySelector('body').addEventListener('change', (event) => {
  const saveAddressData = event.target.nodeName === 'SELECT';
  if (saveAddressData) {
    _saveAddressData();
    // console.log(event.target);
    return;
  }
});
