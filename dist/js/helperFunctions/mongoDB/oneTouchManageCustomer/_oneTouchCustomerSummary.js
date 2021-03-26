import { _fetchOneTouchCustomerDataById } from './_fetchOneTouchCustomerDataById.js';
import { persistDOMData } from '../../../persistDOMData.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _oneTouchCustomerSummary(id, pageName) {
  console.log('Customer Summary Info...');

  const data = await _fetchOneTouchCustomerDataById(id);
  console.log(data);

  const customerDataContainer = document.createElement('div');
  customerDataContainer.id = 'customerDataContainer';
  const customerDataHTML = `<div class='alignHorizontally'>
                                        <div class="manageCustomerRow">
                                          <div class="tableCell">${data.customerFullName}</div>
                                          <div class="tableCell">${data.customerPhoneNumber}</div>
                                          <div class="tableCell">${data.customerEmail}</div>
                                        </div>
                                      </div>
                                      <goPageBack class="btnOneTouch" role="button">
                                          Go Back
                                      </goPageBack>`;

  if (pageName === 'manage-customer') {
    const oneTouchCustomer = document.createElement('div');
    oneTouchCustomer.id = 'oneTouchCustomer';
    oneTouchCustomer.innerHTML = customerDataHTML;

    const manageCustomerContainer = document.querySelector(
      '#manageCustomerContainer'
    );
    const oneTouchManageCustomerPageOne = document.querySelector(
      '#oneTouchManageCustomerPageOne'
    );

    oneTouchManageCustomerPageOne.classList.add('hidden');
    manageCustomerContainer.appendChild(oneTouchCustomer);
  }

  persistDOMData('oneTouchBodyContainer', pageName);
}

export { _oneTouchCustomerSummary };
