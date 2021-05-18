import { persistDOMData } from '../../../persistDOMData.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _oneTouchCustomers() {
  console.log('Fetching customers from db...');
  _spinner(true, 'Loading Active Users...');
  const endPoint = location.href.split('/').slice(-1)[0];
  const access_token = sessionStorage.getItem('access_token');
  const connectionChecker = 'connection-checker';
  const userManagement = 'user-management';
  const userAddressBook = 'user-address-book';

  let URL = '/oneTouch/customer/filterCustomers';
  if (endPoint.includes(userAddressBook))
    URL = '/oneTouch/customer/allCustomers';

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
    let customerDataContainer;

    const data = await response.json();
    const totalCustomers = data.length;
    console.log(data);

    data.map((oneTouchCustomerData) => {
      const oneTouchCustomer = oneTouchCustomerData.oneTouchCustomer;
      const id = oneTouchCustomerData._id;

      if (endPoint.includes(connectionChecker))
        manageDataContainer = `<div class="manageDataContainer">
                                <customerInfo id='${id}' class="btnB01" role="button">
                                  Info
                                </customerInfo>
                                <selectCustomer id='${id}'
                                            class="btnB01 bgPrimary" 
                                            role="button">
                                  Place Order
                                </selectCustomer>
                              </div>`;

      if (
        endPoint.includes(userManagement) ||
        endPoint.includes(userAddressBook)
      )
        manageDataContainer = `<div class="manageDataContainer">
                                  <customerInfo id='${id}' class="btnB01" role="button">
                                    Info
                                  </customerInfo>
                                  <deleteCustomer id='${id}'
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
                        <div class="rowComponent-3">
                          <div class="rowComponentWrapper">
                            <div>${oneTouchCustomer.companyName}</div>
                            <div class="bottomDataRow">${oneTouchCustomer.customerFullName}</div>
                          </div>
                          <div class="rowComponentWrapper">
                            <div>${oneTouchCustomer.thoroughfare_number} ${oneTouchCustomer.thoroughfare_name}</div>
                            <div class="bottomDataRow">${oneTouchCustomer.postcode}</div>
                          </div>
                          <div class="rowComponentWrapper">
                            ${manageDataContainer}
                          </div>
                        </div>
                      </div>`;
    });

    customerDataContainer = ` 
                        <div class="features">
                          <div class="flex-container-30">
                            <div class="oneTouchFormContainer bgGradientSilver">
                              <div class="alignHorizontally fontH3">Customer Overview</div>
                              <div class="fontH2">
                                Manage and overview customers - anytime, anywhere
                              </div>
                              <div class="dataSummaryContainer textSilver fontH2">
                                <div class="dataRowSummaryContainer justifyText">
                                  <div class="rowDisplayStart">Total Customers</div>
                                  <div class="rowDisplayEnd">${totalCustomers}</div>
                                </div>
                              </div>
                            </div>

                            <div class="ndgLogoBanner flex-container-30">
                              <div class="fontH2">
                                <div class="indexBanner">
                                  <div class="ndgIcon"></div>
                                  <div>Unit 4, Saddlers Court, Oakham LE15 7GH</div>
                                  <div>Phone: 024 7509 2481</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="flex-container-70">
                            <div class="oneTouchFormContainer dataContainerWrapper">
                              <div class="headerText">
                                <div class="alignHorizontally fontH4">Active Customer List</div>
                                <div class="alignHorizontally textSilver fontH2">
                                  Manage all customers in one place. View address, contact
                                  information & any personal notes.
                                </div>
                              </div>
                              <div id='dataWrapper' class='dataWrapper'>
                                <div class="rowComponent-3 boxContainer bgGray">
                                  <div class="rowComponentWrapper">Business Contact</div>
                                  <div class="rowComponentWrapper">Address</div>
                                  <div class="rowComponentWrapper">Option</div>
                                </div>
                                  ${customerData}
                                  ${navComponent}
                              </div>
                            </div>
                          </div>
                        </div>`;

    if (data.length === 0) {
      _spinner(false);
      _errorMessage('You Have No Customers added', 'warning');
      customerDataContainer = `   
                              <div class="margin-15 features">
                                <div class="flex-container-60">
                                  <div class="oneTouchFormContainer bgGradientSilver">
                                    <div class="alignHorizontally fontH3">
                                      Your Have No Customers Added!
                                    </div>
                                    <div class="alignHorizontally fontH2">
                                      Manage your customer list - anytime, anywhere
                                    </div>
                                    <div class="dataSummaryContainer textSilver fontH2">
                                      <addCustomer class="btnOneTouch"
                                        >Add New Customer</addCustomer
                                      >
                                    </div>
                                  </div>
                                </div>
                              </div>`;
    }

    const oneTouchCustomers = document.createElement('div');
    oneTouchCustomers.id = 'oneTouchCustomerList';
    oneTouchCustomers.innerHTML = customerDataContainer;

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
    if (endPoint.includes(userManagement) || endPoint.includes(userAddressBook))
      appendCustomersContainer = document.querySelector(
        '#liveConnectionsContainer'
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
