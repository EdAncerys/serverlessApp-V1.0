import { persistDOMData } from '../../../persistDOMData.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _fetchAllOneTouchCustomers(id, pageName) {
  console.log('Customer Summary Info...');
  _spinner(true, 'Loading Customer Information...');
  const URL = '/oneTouch/customer';
  let customerData;

  const body = {
    id,
  };
  console.log(body);

  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    const data = await response.json();
    if (!response.ok) throw new Error(data.msg);
    console.log(data);

    data.map((customer) => {
      customerData = `<div class='rowContainer backgroundLG03'>
                              <div class="manageCustomerRow">
                                <div class="tableCell">${customer.customerFullName}</div>
                                <div class="tableCell">${customer.customerPhoneNumber}</div>
                                <div class="tableCell">${customer.customerEmail}</div>
                              </div>
                            </div>
                            <goBackBtn class="btnOneTouch" role="button">
                                Go Back
                            </goBackBtn>`;
    });

    if (pageName === 'manage-customers') {
      const manageCustomerContainer = document.getElementById(
        'manageCustomerContainer'
      );
      const manageCustomerContent = document.getElementById(
        'manageCustomerContent'
      );
      manageCustomerContent.classList.add('hidden');
      manageCustomerContainer.appendChild(customerData);

      persistDOMData('oneTouchBodyContainer', 'manage-customers');
    }
    _spinner(false);
  } catch (err) {
    console.log(err);
    _spinner(false);
    _errorMessage(err);
  }
}

export { _fetchAllOneTouchCustomers };
