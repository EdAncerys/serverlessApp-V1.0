import { persistDOMData } from '../../../persistDOMData.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _fetchOneTouchCustomersFromDB(pageName) {
  console.log('Fetching customers from db...');
  _spinner(true, 'Loading Active Users...');
  const URL = '/oneTouch/customer/filterCustomers';
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

    const dataWrapper = document.createElement('div');
    dataWrapper.id = 'dataWrapper';
    let rowDataSelection;
    let customerData = '';
    let sliderNav = '';
    let customerDataHTML;

    console.log(data);
    data.map((customer) => {
      if (pageName === 'manage-customer') {
        rowDataSelection = `<div class="rowDataSelection">
                                  <customerInfo id='${customer._id}' class="btnB01" role="button">
                                    Info
                                  </customerInfo>
                                  <deleteCustomer id='${customer._id}' class="btnB01 bgDanger" role="button">
                                    Delete
                                  </deleteCustomer>
                                </div>`;
      }
      if (pageName === 'connection-checker') {
        rowDataSelection = `<div class="rowDataSelection">
                                  <customerInfo id='${customer._id}' class="btnB01" role="button">
                                    Info
                                  </customerInfo>
                                  <selectCustomer id='${customer._id}'
                                              class="btnB01 bgPrimary" 
                                              role="button">
                                    Place Order
                                  </selectCustomer>
                                </div>`;

        sliderNav = `<div class='navWrapper alignHorizontally'>
                        <goPageBack id='pageOne' class="btnOneTouch" role="button">
                          Go Back
                        </goPageBack>
                        <addUser class="btnOneTouch" 
                                  role="button"
                                  onclick = "location.href='../../../../views/oneTouch/add-customer.html'";>
                          Add User
                        </addUser>
                      </div>`;
      }

      customerData += `<div class="rowContainer bgGradientSilver">
                        <div class="rowDataContainer-4">
                          <div class="rowDataWrapper">
                            <div>${customer.companyName}</div>
                            <div class="bottomDataRow">${customer.customerFullName}</div>
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
                            ${rowDataSelection}
                          </div>
                        </div>
                      </div>`;
    });

    customerDataHTML = `<div class="headerText">
                          <div class="fontH4">Your Customer List</div>
                          <div class="fontH2">
                            Manage all customers in one place. View address, contact
                            information, etc. & any personal notes.
                          </div>
                        </div>
                        <div id='dataWrapper' class='dataWrapper'>
                          <div class="rowDataContainer-4 boxContainer bgGray">
                            <div class="rowDataWrapper">Business Contact</div>
                            <div class="rowDataWrapper">Contact Details</div>
                            <div class="rowDataWrapper">Address</div>
                            <div class="rowDataWrapper">Option</div>
                          </div>
                            ${customerData}
                            ${sliderNav}
                        </div>`;

    if (data.length === 0) {
      _spinner(false);
      _errorMessage('You Have No Customers added', 'warning');
      customerDataHTML = `<section class="features">
                            <div class="flex-container-30">
                              <div class="headerText alignHorizontally">
                                <div class="fontH3">Your Have No Customers Added!</div>
                                <addCustomer class="btnOneTouch">Add New Customer</addCustomer>
                              </div>
                            </div>
                          </section>`;
    }

    const oneTouchCustomer = document.createElement('div');
    oneTouchCustomer.id = 'oneTouchBroadbandOrderPageTwo';
    oneTouchCustomer.innerHTML = customerDataHTML;

    if (pageName === 'manage-customer') {
      const manageCustomerWrapper = document.querySelector(
        '#manageCustomerWrapper'
      );

      const removeData = document.querySelector(
        '#oneTouchBroadbandOrderPageTwo'
      );
      if (removeData) removeData.remove();

      manageCustomerWrapper.appendChild(oneTouchCustomer);
    }
    if (pageName === 'connection-checker') {
      // Removing customer previous data
      const removeData = document.querySelector(
        '#oneTouchBroadbandOrderPageTwo'
      );
      if (removeData) removeData.remove();

      const oneTouchBrodbandContainer = document.querySelector(
        '#oneTouchBrodbandContainer'
      );
      const oneTouchBroadbandOrderPageOne = document.getElementById(
        'oneTouchBroadbandOrderPageOne'
      );

      oneTouchBroadbandOrderPageOne.classList.add('hidden');
      oneTouchBrodbandContainer.appendChild(oneTouchCustomer);
    }

    const endPoint = location.href.split('/').slice(-1)[0];
    persistDOMData(endPoint);
    _spinner(false);
  } catch (err) {
    console.log(err);
    _spinner(false);
    _errorMessage(err);
  }
}

export { _fetchOneTouchCustomersFromDB };
