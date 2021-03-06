import { fetchUserAddress } from './_helperFunctions/mongoDB/oneTouchUsers/fetchUserAddress.js';

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('userAddressSearch')
    .addEventListener('click', userAddressSearch);
});

const userAddressSearch = (ev) => {
  ev.preventDefault();
  fetchUserAddress();
};
