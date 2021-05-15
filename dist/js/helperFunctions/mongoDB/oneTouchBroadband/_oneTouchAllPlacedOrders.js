import { persistDOMData } from '../../../persistDOMData.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _oneTouchAllPlacedOrders() {
  console.log('Fetching all orders...');
  _spinner(true, 'Loading Orders...');
  const URL = '/oneTouch/orders/oneTouchBroadband';
  const access_token = await sessionStorage.getItem('access_token');

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
    console.log(data);
    if (!response.ok) throw new Error(data);

    const oneTouchBroadband = data.oneTouchBroadband;
    console.log(oneTouchBroadband);

    let manageDataContainer = '';
    let dataContainer = '';
    let contractDataContainer = '';
    let totalPendingContracts = 0;
    let totalApprovedContracts = 0;

    oneTouchBroadband.map((contract) => {
      console.log(contract);
      const liveContract = contract.oneTouchBroadband.contractStartDay;
      if (!liveContract) totalPendingContracts += 1;
      if (liveContract) totalApprovedContracts += 1;

      const oneTouchSuperUser = contract.oneTouchSuperUser;
      const oneTouchCustomerData = contract.oneTouchCustomer;
      let oneTouchCustomer = [];
      if (oneTouchCustomerData)
        oneTouchCustomer = contract.oneTouchCustomer.oneTouchCustomer;
      const id = contract._id;

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
                                Update
                              </contractInfo>
                              <deleteContract id='${id}' class="btnB01 bgDanger" role="button">
                                Delete
                              </deleteContract>
                            </div>`;

      let rowComponent = 'bgGO';
      if (!liveContract) rowComponent = 'bgSTOP';

      dataContainer += `<div class="rowContainer ${rowComponent}">
                          <div class="rowComponent-3">
                            <div class="rowComponentWrapper">
                              <div>${oneTouchSuperUser.email}</div>
                              <div class="bottomDataRow">${oneTouchCustomer.customerFullName}</div>
                            </div>
                            <div class="rowComponentWrapper">
                              <div>${thoroughfare_number} ${premises_name} ${sub_premises} ${thoroughfare_name} ${county}</div>
                              <div class="bottomDataRow">${postcode}</div>
                            </div>
                            <div class="rowComponentWrapper">
                              ${manageDataContainer}
                            </div>
                          </div>
                        </div>`;
    });

    const totalContracts = oneTouchBroadband.length;

    contractDataContainer = `<div class="features">
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
                                    <div class="dataRowSummaryContainer justifyText bgSTOP">
                                      <div class="rowDisplayStart">Pending Contracts</div>
                                      <div class="rowDisplayEnd">${totalPendingContracts}</div>
                                    </div>
                                    <div class="dataRowSummaryContainer justifyText bgGO">
                                      <div class="rowDisplayStart">Live Contracts</div>
                                      <div class="rowDisplayEnd">${totalApprovedContracts}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="flex-container-70">
                                <div class="oneTouchFormContainer dataContainerWrapper">
                                  <div class="headerText">
                                    <div class="alignHorizontally fontH4">Manage All Placed Orders</div>
                                    <div class="alignHorizontally fontH2">
                                      Manage all placed orders in one place with a touch of a finger!
                                    </div>
                                  </div>
                                  <div id='dataWrapper' class='dataWrapper'>
                                    <div class="rowComponent-3 boxContainer bgGray">
                                      <div class="rowComponentWrapper">Business Contact</div>
                                      <div class="rowComponentWrapper">Address</div>
                                      <div class="rowComponentWrapper">Manage</div>
                                    </div>
                                      ${dataContainer}
                                  </div>
                                </div>
                              </div>
                            </div>`;

    if (oneTouchBroadband.length === 0) {
      _errorMessage('Have no Pending Orders!', 'warning');

      contractDataContainer = `
                              <div class="margin-10 features">
                                <div class="flex-container-60">
                                  <div class="oneTouchFormContainer bgGradientSilver">
                                    <div class="alignHorizontally fontH3">
                                      Your Have No Pending Orders!
                                    </div>
                                    <div class="alignHorizontally fontH2">
                                      Manage your orders - anytime, anywhere
                                    </div>
                                  </div>
                                </div>
                              </div>`;
    }

    const liveConnections = document.querySelector('#liveConnections');
    // Removing user previous data
    const removeData = document.querySelector('#oneTouchContracts');
    if (removeData) removeData.remove();

    const oneTouchContracts = document.createElement('div');
    oneTouchContracts.id = 'oneTouchContracts';
    oneTouchContracts.innerHTML = contractDataContainer;

    liveConnections.appendChild(oneTouchContracts);

    const endPoint = location.href.split('/').slice(-1)[0];
    persistDOMData(endPoint);
    _spinner(false);
  } catch (err) {
    console.log(err);
    _spinner(false);
    _errorMessage(err);
  }
}

export { _oneTouchAllPlacedOrders };
