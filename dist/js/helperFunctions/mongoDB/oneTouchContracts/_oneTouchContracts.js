import { persistDOMData } from '../../../persistDOMData.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _oneTouchContracts(pageName) {
  console.log('Fetching customers from db...');
  _spinner(true, 'Loading Active Users...');
  const URL = '/oneTouch/orders/allPlacedOrders';
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
    if (!response.ok) throw new Error(data);

    const dataWrapper = document.createElement('div');
    dataWrapper.id = 'dataWrapper';
    let dbRowData;
    let customerData = '';
    let customerDataHTML;

    const dbData = await response.json();
    const data = dbData.data;
    console.log(data);
    data.map((customer) => {
      dbRowData = `<div class="dbRowData">
                            <customerInfo id='${customer._id}' class="btnB01" role="button">
                              Info
                            </customerInfo>
                            <deleteCustomer id='${customer._id}' class="btnB01 bgDanger" role="button">
                              Delete
                            </deleteCustomer>
                          </div>`;

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
                            ${dbRowData}
                          </div>
                        </div>
                      </div>`;
    });

    customerDataHTML = `<div class="features">
                          <div class="flex-container-30">
                            <div class="oneTouchFormContainer bgGradientSilver">
                              <div class="alignHorizontally fontH3">Contract Overview</div>
                              <div class="fontH2">
                                Manage and overview contracts - anytime, anywhere
                              </div>
                              <div class="dataSummaryContainer textSilver fontH2">
                                <div class="dataRowSummaryContainer justifyText">
                                  <div class="rowDisplayStart">Total Contracts</div>
                                  <div class="rowDisplayEnd">0</div>
                                </div>
                                <div class="dataRowSummaryContainer justifyText">
                                  <div class="rowDisplayStart">
                                    Contracts with exp date > 6 month
                                  </div>
                                  <div class="rowDisplayEnd">0</div>
                                </div>
                                <div class="dataRowSummaryContainer justifyText">
                                  <div class="rowDisplayStart">
                                    Contracts with exp date < 6 month
                                  </div>
                                  <div class="rowDisplayEnd">0</div>
                                </div>
                                <div class="dataRowSummaryContainer justifyText">
                                  <div class="rowDisplayStart">Expired Contracts</div>
                                  <div class="rowDisplayEnd">0</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="flex-container-70">
                            <div class="headerText">
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
                            </div>
                          </div>
                        </div>`;

    const oneTouchCustomer = document.createElement('div');
    oneTouchCustomer.id = 'oneTouchManageCustomerPageOne';
    oneTouchCustomer.innerHTML = customerDataHTML;

    const manageCustomerWrapper = document.querySelector(
      '#manageCustomerWrapper'
    );

    const removeData = document.querySelector('#oneTouchManageCustomerPageTwo');
    if (removeData) removeData.remove();

    if (data.length === 0) {
      _errorMessage('You Have No Customers added', 'warning');
      customerDataHTML = `<section class="features">
                            <div class="flex-container-30">
                              <div class="headerText alignHorizontally">
                                <div class="fontH3">Your Have No Customers Added!</div>
                                <addCustomer class="btnOneTouch">Add New Customer</addCustomer>
                              </div>
                            </div>
                          </section>`;

      manageCustomerWrapper.innerHTML = customerDataHTML;
    } else {
      manageCustomerWrapper.appendChild(oneTouchCustomer);
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

export { _oneTouchContracts };
