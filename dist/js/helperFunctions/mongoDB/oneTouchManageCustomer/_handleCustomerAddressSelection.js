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

  const oneTouch = JSON.parse(sessionStorage.getItem('oneTouch'));
  const sub_premises =
    oneTouch.sub_premises === 'null' ? '' : oneTouch.sub_premises;
  const premises_name =
    oneTouch.premises_name === 'null' ? '' : oneTouch.premises_name;
  const thoroughfare_number =
    oneTouch.thoroughfare_number === 'null' ? '' : oneTouch.thoroughfare_number;
  const thoroughfare_name =
    oneTouch.thoroughfare_name === 'null' ? '' : oneTouch.thoroughfare_name;
  const county = oneTouch.county === 'null' ? '' : oneTouch.county;
  const postcode = oneTouch.postcode === 'null' ? '' : oneTouch.postcode;

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
