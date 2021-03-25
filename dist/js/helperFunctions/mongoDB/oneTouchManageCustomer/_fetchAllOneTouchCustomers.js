import { persistDOMData } from '../../../persistDOMData.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _fetchAllOneTouchCustomers(pageName) {
  console.log('Fetching customers from db...');
  _spinner(true, 'Loading Active Users...');
  const URL = '/oneTouch/customer';
  const access_token = sessionStorage.getItem('access_token');

  const body = {
    access_token,
  };
  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    const data = await response.json();
    if (!response.ok) throw new Error(data);

    const customerDataContainer = document.createElement('div');
    customerDataContainer.id = 'customerDataContainer';
    let customerRowSelection;
    let customerData = '';
    let sliderNav = '';
    let customerDataHTML;

    if (data.length === 0) {
      customerDataHTML = `<div class='alignHorizontally'>
                            <div>You have no customers added</div>
                            ${sliderNav}
                          </div>`;
      _spinner(false);
      return;
    }

    console.log(data);
    data.map((customer) => {
      if (pageName === 'manage-customer') {
        customerRowSelection = `<div class="customerRowSelection">
                                  <customerInfo id='${customer._id}' class="btnB01" role="button">
                                    Info
                                  </customerInfo>
                                  <deleteCustomer id='${customer._id}' class="btnB01" role="button">
                                    Delete
                                  </deleteCustomer>
                                </div>`;
      }
      if (pageName === 'order-new-connection') {
        customerRowSelection = `<div class="customerRowSelection">
                          <customerInfo id='${customer._id}' class="btnB01" role="button">
                            Info
                          </customerInfo>
                          <selectCustomer id='${customer._id}'
                                      class="btnB01" 
                                      role="button">
                            Select
                          </selectCustomer>
                        </div>`;

        sliderNav = `<div class='navWrapper alignHorizontally'>
                        <goPageBack id='pageOne' class="btnOneTouch backgroundSecondary" role="button">
                          Go Back
                        </goPageBack>
                        <addUser class="btnOneTouch" 
                                  role="button"
                                  onclick = "location.href='../../../../views/oneTouch/add-customer.html'";>
                          Add User
                        </addUser>
                      </div>`;
      }

      customerData += `<div class="rowContainer backgroundLG03">
                        <div class="manageCustomerRow">
                          <div class="rowDataWrapper">
                            <div>${customer.customerFullName}</div>
                            <div class="bottomDataRow">${customer.customerCreated}</div>
                          </div>
                          <div class="rowDataWrapper">
                            <div>${customer.customerPhoneNumber}</div>
                            <div class="bottomDataRow">${customer.customerEmail}</div>
                          </div>
                          <div class="rowDataWrapper">
                            <div>${customer.thoroughfare_number} ${customer.thoroughfare_name}</div>
                            <div class="bottomDataRow">${customer.postcode}</div>
                          </div>
                          <div class="rowDataWrapper">
                            <div>${customerRowSelection}</div>
                          </div>
                        </div>
                      </div>`;
    });

    customerDataHTML = `<div id='customerDataContainer' class='customerDataContainer'>
                          <div class="manageCustomerRow boxContainer backgroundGray">
                            <div class="rowDataWrapper">Customer</div>
                            <div class="rowDataWrapper">Contact Details</div>
                            <div class="rowDataWrapper">Address</div>
                            <div class="rowDataWrapper">Selection</div>
                          </div>
                            ${customerData}
                            ${sliderNav}
                        </div>`;

    const oneTouchCustomer = document.createElement('div');
    oneTouchCustomer.id = 'oneTouchBroadbandOrderPageTwo';
    oneTouchCustomer.innerHTML = customerDataHTML;

    if (pageName === 'manage-customer') {
      const manageCustomerWrapper = document.querySelector(
        '#manageCustomerWrapper'
      );
      const oneTouchManageCustomerPageOne = document.querySelector(
        '#oneTouchManageCustomerPageOne'
      );

      oneTouchManageCustomerPageOne.classList.add('hidden');
      manageCustomerWrapper.appendChild(oneTouchCustomer);
      persistDOMData('oneTouchBodyContainer', pageName);
    }
    if (pageName === 'order-new-connection') {
      // Removing customer previous data
      const removeData = document.querySelector(
        '#oneTouchBroadbandOrderPageTwo'
      );
      if (removeData) removeData.remove();

      const oneTouchSlider = document.querySelector('#oneTouchSlider');
      const oneTouchBroadbandOrderPageOne = document.getElementById(
        'oneTouchBroadbandOrderPageOne'
      );

      oneTouchBroadbandOrderPageOne.classList.add('hidden');
      oneTouchSlider.appendChild(oneTouchCustomer);
      persistDOMData('oneTouchBodyContainer', pageName);
    }
    _spinner(false);
  } catch (err) {
    console.log(err);
    _spinner(false);
    _errorMessage(err);
  }
}

export { _fetchAllOneTouchCustomers };
