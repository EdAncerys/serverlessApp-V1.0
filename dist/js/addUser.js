import { _fetchUserAddress } from './_helperFunctions/mongoDB/oneTouchUsers/_fetchUserAddress.js';

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('userAddressSearch')
    .addEventListener('click', userAddressSearch);
});

const userAddressSearch = (ev) => {
  ev.preventDefault();
  _fetchUserAddress();
};

document.querySelector('body').addEventListener('click', (event) => {
  const selectUserAddress = event.target.nodeName === 'SELECTUSERADDRESS';
  const goBackBtn = event.target.nodeName === 'GOBACKBTN';

  // console.log(event.target);
  if (selectUserAddress) {
    console.log('select user address');
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
    // _saveAddressData();
    console.log('selecting new address');
    return;
  }
});
