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

  const oneTouchData = JSON.parse(sessionStorage.getItem('oneTouchData'));
  const sub_premises =
    oneTouchData.sub_premises === 'null' ? '' : oneTouchData.sub_premises;
  const premises_name =
    oneTouchData.premises_name === 'null' ? '' : oneTouchData.premises_name;
  const thoroughfare_number =
    oneTouchData.thoroughfare_number === 'null'
      ? ''
      : oneTouchData.thoroughfare_number;
  const thoroughfare_name =
    oneTouchData.thoroughfare_name === 'null'
      ? ''
      : oneTouchData.thoroughfare_name;
  const county = oneTouchData.county === 'null' ? '' : oneTouchData.county;
  const postcode =
    oneTouchData.postcode === 'null' ? '' : oneTouchData.postcode;

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
