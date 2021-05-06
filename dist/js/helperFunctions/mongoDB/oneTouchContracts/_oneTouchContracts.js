import { persistDOMData } from '../../../persistDOMData.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _oneTouchContracts() {
  console.log('Fetching customers from db...');
  _spinner(true, 'Loading Active Users...');
  const URL = '/oneTouch/orders/userPlacedOrders';
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

    const oneTouchBroadband = data.oneTouchBroadband;
    console.log(oneTouchBroadband);

    const dataWrapper = document.createElement('div');
    dataWrapper.id = 'dataWrapper';
    let manageDataContainer;
    let customerData = '';
    let customerDataHTML;

    oneTouchBroadband.map((userPlacedOrders) => {
      console.log(userPlacedOrders);
      const oneTouchCustomerData = userPlacedOrders.oneTouchCustomer;
      let oneTouchCustomer = [];
      if (oneTouchCustomerData)
        oneTouchCustomer = userPlacedOrders.oneTouchCustomer.oneTouchCustomer;
      const id = userPlacedOrders._id;

      let thoroughfare_number =
        oneTouchCustomer.thoroughfare_number === 'null'
          ? ''
          : oneTouchCustomer.thoroughfare_number;
      let premises_name =
        oneTouchCustomer.premises_name === 'null'
          ? ''
          : oneTouchCustomer.premises_name;
      let sub_premises =
        oneTouchCustomer.sub_premises === 'null'
          ? ''
          : oneTouchCustomer.sub_premises;
      let thoroughfare_name =
        oneTouchCustomer.thoroughfare_name === 'null'
          ? ''
          : oneTouchCustomer.thoroughfare_name;
      let county =
        oneTouchCustomer.county === 'null' ? '' : oneTouchCustomer.county;
      let postcode = oneTouchCustomer.postcode;

      manageDataContainer = `<div class="manageDataContainer">
                            <contractInfo id='${id}' class="btnB01" role="button">
                              Info
                            </contractInfo>
                            <deleteContract id='${id}' class="btnB01 bgDanger" role="button">
                              Delete
                            </deleteContract>
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
                            <div>${thoroughfare_number} ${premises_name} ${sub_premises} ${thoroughfare_name} ${county}</div>
                            <div class="bottomDataRow">${postcode}</div>
                          </div>
                          <div class="rowDataWrapper">
                            ${manageDataContainer}
                          </div>
                        </div>
                      </div>`;
    });

    const totalContracts = oneTouchBroadband.length;

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
                                  <div class="rowDisplayEnd">${totalContracts}</div>
                                </div>
                                <div class="dataRowSummaryContainer justifyText textWhite bgGreen">
                                  <div class="rowDisplayStart">
                                    Contracts with exp date > 6 month
                                  </div>
                                  <div class="rowDisplayEnd">0</div>
                                </div>
                                <div class="dataRowSummaryContainer justifyText textWhite bgWarning">
                                  <div class="rowDisplayStart">
                                    Contracts with exp date < 6 month
                                  </div>
                                  <div class="rowDisplayEnd">0</div>
                                </div>
                                <div class="dataRowSummaryContainer justifyText textWhite bgDanger">
                                  <div class="rowDisplayStart">Expired Contracts</div>
                                  <div class="rowDisplayEnd">0</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="contractWrapper">
                            <div class="flex-container-70">
                              <div class="headerText">
                                <div class="fontH4">Live Contracts & Customer List</div>
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
                          </div>
                        </div>`;

    const removeData = document.querySelector('#oneTouchManageCustomerPageOne');
    if (removeData) removeData.remove();

    const oneTouchCustomer = document.createElement('div');
    oneTouchCustomer.id = 'oneTouchManageCustomerPageOne';
    oneTouchCustomer.innerHTML = customerDataHTML;

    const manageCustomerWrapper = document.querySelector(
      '#manageCustomerWrapper'
    );

    if (oneTouchBroadband.length === 0) {
      _errorMessage('Have No Placed Contract!', 'warning');

      customerDataHTML = `<section class="features">
                            <div class="flex-container-30">
                              <div class="headerText alignHorizontally">
                                <div class="fontH3">Your Have No Contracts Added!</div>
                                <addNewContract class="btnOneTouch">Add New Contract</addNewContract>
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
  } catch (error) {
    console.log(error);
    _spinner(false);
    _errorMessage(error.msg);
  }
}

export { _oneTouchContracts };
