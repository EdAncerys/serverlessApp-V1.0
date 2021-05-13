import { persistDOMData } from '../../../persistDOMData.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _sortAddresses } from '../../icukBroadband/_sortAddresses.js';
import { _spinner } from '../../_spinner.js';

async function _handleCustomerAddressSelection() {
  console.log('User Address Selected...');

  // DOM manipulation
  const userAddressContainer = document.querySelector('#userAddressContainer');
  const selectAddressContainer = document.querySelector(
    '#selectAddressContainer'
  );
  const selectionContainer = document.createElement('div');
  selectionContainer.id = 'selectionContainer';

  const data = JSON.parse(sessionStorage.getItem('selectedAddress'));
  const selectedAddress = data.selectedAddress;

  const sub_premises =
    selectedAddress.sub_premises === 'null' ? '' : selectedAddress.sub_premises;
  const premises_name =
    selectedAddress.premises_name === 'null'
      ? ''
      : selectedAddress.premises_name;
  const thoroughfare_number =
    selectedAddress.thoroughfare_number === 'null'
      ? ''
      : selectedAddress.thoroughfare_number;
  const thoroughfare_name =
    selectedAddress.thoroughfare_name === 'null'
      ? ''
      : selectedAddress.thoroughfare_name;
  const county =
    selectedAddress.county === 'null' ? '' : selectedAddress.county;
  const postcode =
    selectedAddress.postcode === 'null' ? '' : selectedAddress.postcode;

  selectionContainer.innerHTML = `<div class='selectAddressContainer'>
                                    <div class='addCustomerSelectAddressContainer'>
                                      <div>Installation Address:</div>
                                      <div>${thoroughfare_number} ${premises_name} ${sub_premises} ${thoroughfare_name} ${county}</div>
                                    </div>
                                    <div>
                                      <label for="fname">Postcode:</label>
                                      <div>${postcode}</div>
                                    </div>
                                  <div>`;

  userAddressContainer.appendChild(selectionContainer);
  selectAddressContainer.remove();
  const endPoint = location.href.split('/').slice(-1)[0];
  persistDOMData(endPoint);
}

export { _handleCustomerAddressSelection };
