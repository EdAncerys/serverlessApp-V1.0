import { persistDOMData } from '../../../persistDOMData.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _oneTouchCustomers() {
  console.log('Fetching customers from db...');
  _spinner(true, 'Loading Active Users...');
  const URL = '/oneTouch/customer/filterCustomers';
  const access_token = sessionStorage.getItem('access_token');

  const endPoint = location.href.split('/').slice(-1)[0];
  const connectionChecker = 'connection-checker';
  const manageCustomer = 'manage-customer';

  const body = {
    access_token,
  };
  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    if (!response.ok) throw new Error(response.statusText);

    const dataWrapper = document.createElement('div');
    dataWrapper.id = 'dataWrapper';
    let manageDataContainer = '';
    let customerData = '';
    let navComponent = '';
    let customerDataHTML;

    const data = await response.json();
    console.log(data);

    data.map((oneTouchCustomerData) => {
      let oneTouchCustomer = oneTouchCustomerData.oneTouchCustomer;

      if (endPoint.includes(connectionChecker))
        manageDataContainer = `<div class="manageDataContainer">
                                <customerInfo id='${oneTouchCustomer._id}' class="btnB01" role="button">
                                  Info
                                </customerInfo>
                                <selectCustomer id='${oneTouchCustomer._id}'
                                            class="btnB01 bgPrimary" 
                                            role="button">
                                  Place Order
                                </selectCustomer>
                              </div>`;

      if (endPoint.includes(manageCustomer))
        manageDataContainer = `<div class="manageDataContainer">
                                  <customerInfo id='${oneTouchCustomer._id}' class="btnB01" role="button">
                                    Info
                                  </customerInfo>
                                  <deleteCustomer id='${oneTouchCustomer._id}'
                                              class="btnB01 bgDanger" 
                                              role="button">
                                    Delete
                                  </deleteCustomer>
                                </div>`;

      if (endPoint.includes(connectionChecker))
        navComponent = `<div class='navWrapper alignHorizontally'>
                      <goPageBack id='pageOne' class="btnOneTouch" role="button">
                        Go Back
                      </goPageBack>
                      <addUser class="btnOneTouch" 
                                role="button"
                                onclick = "location.href='../../../../views/oneTouch/add-oneTouchCustomer.html'";>
                        Add New Customer
                      </addUser>
                    </div>`;

      customerData += `<div class="rowContainer bgGradientSilver">
                        <div class="rowDataContainer-4">
                          <div class="rowDataWrapper">
                            <div>${oneTouchCustomer.companyName}</div>
                            <div class="bottomDataRow">${oneTouchCustomer.customerFullName}</div>
                          </div>
                          <div class="rowDataWrapper">
                            <div>${oneTouchCustomer.customerPhoneNumber}</div>
                            <div class="bottomDataRow">${oneTouchCustomer.customerEmail}</div>
                          </div>
                          <div class="rowDataWrapper">
                            <div>${oneTouchCustomer.thoroughfare_number} ${oneTouchCustomer.thoroughfare_name}</div>
                            <div class="bottomDataRow">${oneTouchCustomer.postcode}</div>
                          </div>
                          <div class="rowDataWrapper">
                            ${manageDataContainer}
                          </div>
                        </div>
                      </div>`;
    });

    customerDataHTML = ` <div class="features">
                            <div class="flex-container-80">
                              <div class="headerText">
                                <div class="fontH4">Customer List</div>
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
                                  ${navComponent}
                              </div>
                            </div>
                          </div>`;

    if (data.length === 0) {
      _spinner(false);
      _errorMessage('You Have No Customers added', 'warning');
      customerDataHTML = `<section class="features">
                            <div class="flex-container-30">
                              <div class="headerText">
                                <div class="fontH3">Your Have No Customers Added!</div>
                                <addCustomer class="btnOneTouch">Add New Customer</addCustomer>
                              </div>
                            </div>
                          </section>`;
    }

    const oneTouchCustomers = document.createElement('div');
    oneTouchCustomers.id = 'oneTouchCustomerList';
    oneTouchCustomers.innerHTML = customerDataHTML;

    // Removing customer previous data
    const removeData = document.querySelector('#oneTouchCustomerList');
    if (removeData) removeData.remove();

    let appendCustomersContainer;
    let hideDataContainer;

    // connection-checker DOM
    if (endPoint.includes(connectionChecker))
      appendCustomersContainer = document.querySelector(
        '#oneTouchBroadbandContainer'
      );
    if (endPoint.includes(connectionChecker))
      hideDataContainer = document.getElementById(
        'oneTouchBroadbandOrderPageOne'
      );
    // connection-checker DOM
    if (endPoint.includes(manageCustomer))
      appendCustomersContainer = document.querySelector(
        '#manageCustomerContainer'
      );

    if (hideDataContainer) hideDataContainer.classList.add('hidden');
    appendCustomersContainer.appendChild(oneTouchCustomers);

    persistDOMData(endPoint);
    _spinner(false);
  } catch (err) {
    console.log(err);
    _spinner(false);
    _errorMessage(err);
  }
}

export { _oneTouchCustomers };
