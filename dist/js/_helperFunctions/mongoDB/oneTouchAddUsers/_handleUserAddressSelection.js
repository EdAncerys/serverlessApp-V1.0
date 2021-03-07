import { _errorMessage } from '../../_errorMessage.js';
import { _sortAddresses } from '../../_icukBroadband/_sortAddresses.js';
import { _spinner } from '../../_spinner.js';

async function _handleUserAddressSelection() {
  console.log('User Address Selected...');
  sessionStorage.setItem('userAddressValidation', true);

  // DOM manipulation
  const userAddressContainer = document.querySelector('#userAddressContainer');
  const selectAddressContainer = document.querySelector(
    '#selectAddressContainer'
  );
  const selectionContainer = document.createElement('div');
  selectionContainer.id = 'selectionContainer';

  const thoroughfare_number =
    sessionStorage.getItem('thoroughfare_number') === 'null'
      ? ''
      : sessionStorage.getItem('thoroughfare_number');
  const thoroughfare_name =
    sessionStorage.getItem('thoroughfare_name') === 'null'
      ? ''
      : sessionStorage.getItem('thoroughfare_name');
  const postcode =
    sessionStorage.getItem('postcode') === 'null'
      ? ''
      : sessionStorage.getItem('postcode');
  const sub_premises =
    sessionStorage.getItem('sub_premises') === 'null'
      ? ''
      : sessionStorage.getItem('sub_premises');
  const county =
    sessionStorage.getItem('county') === 'null'
      ? ''
      : sessionStorage.getItem('county');
  const premises_name =
    sessionStorage.getItem('premises_name') === 'null'
      ? ''
      : sessionStorage.getItem('premises_name');

  selectionContainer.innerHTML = `<div class='selectAddressContainer'>
                                    <div>
                                      <label for="fname">User Address:</label>
                                      <div>${thoroughfare_number} ${premises_name} ${sub_premises} ${thoroughfare_name} ${county}</div>
                                    </div>
                                    <div>
                                      <label for="fname">Postcode:</label>
                                      <div>${postcode}</div>
                                    </div>
                                  <div>`;

  userAddressContainer.appendChild(selectionContainer);
  selectAddressContainer.remove();
}

export { _handleUserAddressSelection };
