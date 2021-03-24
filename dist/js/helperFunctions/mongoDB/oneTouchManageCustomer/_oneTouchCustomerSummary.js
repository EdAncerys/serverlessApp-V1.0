import { _fetchOneTouchCustomerDataById } from './_fetchOneTouchCustomerDataById.js';
import { persistDOMData } from '../../../persistDOMData.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _oneTouchCustomerSummary(id, pageName) {
  console.log('Customer Summary Info...');

  const data = await _fetchOneTouchCustomerDataById(id);
  console.log(data);

  const customerData = `<div class='rowContainer backgroundLG03'>
                              <div class="manageCustomerRow">
                                <div class="tableCell">${data.customerFullName}</div>
                                <div class="tableCell">${data.customerPhoneNumber}</div>
                                <div class="tableCell">${data.customerEmail}</div>
                              </div>
                            </div>
                            <goBackBtn class="btnOneTouch" role="button">
                                Go Back
                            </goBackBtn>`;

  if (pageName === 'order-new-connection') {
    console.log(customerData);
  }

  persistDOMData('oneTouchBodyContainer', pageName);
}

export { _oneTouchCustomerSummary };
