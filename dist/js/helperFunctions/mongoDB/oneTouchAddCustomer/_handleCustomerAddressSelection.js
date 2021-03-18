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

  const oneTouchAddressData = JSON.parse(
    sessionStorage.getItem('oneTouchAddressData')
  );
  const sub_premises =
    oneTouchAddressData.sub_premises === 'null'
      ? ''
      : oneTouchAddressData.sub_premises;
  const premises_name =
    oneTouchAddressData.premises_name === 'null'
      ? ''
      : oneTouchAddressData.premises_name;
  const thoroughfare_number =
    oneTouchAddressData.thoroughfare_number === 'null'
      ? ''
      : oneTouchAddressData.thoroughfare_number;
  const thoroughfare_name =
    oneTouchAddressData.thoroughfare_name === 'null'
      ? ''
      : oneTouchAddressData.thoroughfare_name;
  const county =
    oneTouchAddressData.county === 'null' ? '' : oneTouchAddressData.county;
  const postcode =
    oneTouchAddressData.postcode === 'null' ? '' : oneTouchAddressData.postcode;

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
  persistDOMData('oneTouchBodyContainer', 'add-customer');
}

export { _handleCustomerAddressSelection };
