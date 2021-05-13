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

  const selectedAddress = JSON.parse(sessionStorage.getItem('selectedAddress'));
  const oneTouchCustomer = selectedAddress.oneTouchCustomer;

  const sub_premises =
    oneTouchCustomer.sub_premises === 'null'
      ? ''
      : oneTouchCustomer.sub_premises;
  const premises_name =
    oneTouchCustomer.premises_name === 'null'
      ? ''
      : oneTouchCustomer.premises_name;
  const thoroughfare_number =
    oneTouchCustomer.thoroughfare_number === 'null'
      ? ''
      : oneTouchCustomer.thoroughfare_number;
  const thoroughfare_name =
    oneTouchCustomer.thoroughfare_name === 'null'
      ? ''
      : oneTouchCustomer.thoroughfare_name;
  const county =
    oneTouchCustomer.county === 'null' ? '' : oneTouchCustomer.county;
  const postcode =
    oneTouchCustomer.postcode === 'null' ? '' : oneTouchCustomer.postcode;

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
