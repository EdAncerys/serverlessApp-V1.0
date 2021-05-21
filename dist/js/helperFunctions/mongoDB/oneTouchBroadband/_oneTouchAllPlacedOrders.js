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
    let contractData = '';
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

      let customerAddress = `${thoroughfare_number} ${premises_name} ${sub_premises} ${thoroughfare_name} ${county}`;
      if (!oneTouchCustomerData)
        customerAddress = 'Customer Address not Available';

      let customerPostcode = `${postcode}`;
      if (!oneTouchCustomerData) customerPostcode = 'Not Available';

      let oneTouchCustomerFullName = `${oneTouchCustomer.customerFullName}`;
      if (!oneTouchCustomerData) oneTouchCustomerFullName = 'Not Available';

      manageDataContainer = `
                            <div class="manageDataContainer">
                              <contractInfo id='${id}' class="btnB01" role="button">
                                Update
                              </contractInfo>
                              <deleteContract id='${id}' class="btnB01 bgDanger" role="button">
                                Delete
                              </deleteContract>
                            </div>`;

      let rowComponent = 'bgGO';
      if (!liveContract) rowComponent = 'bgSTOP';

      contractData += `
                        <searchRowComponent>
                          <div class="rowContainer ${rowComponent}">
                            <div class="rowComponent-3">
                              <div class="cellComponent">
                                <search>${oneTouchSuperUser.email}</search>
                                <search class="bottomDataRow">${oneTouchCustomerFullName}</search>
                              </div>
                              <div class="cellComponent">
                                <search>${customerAddress}</search>
                                <search class="bottomDataRow">${customerPostcode}</search>
                              </div>
                              <div class="cellComponent">
                                ${manageDataContainer}
                              </div>
                            </div>
                          </div>
                        </searchRowComponent>`;
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
                                <div class="oneTouchFormContainer">
                                  <div class="headerText">
                                    <div class="alignHorizontally fontH4">Manage All Placed Orders</div>
                                    <div class="alignHorizontally textSilver fontH2">
                                      Manage all placed orders in one place with a touch of a finger!
                                    </div>
                                  </div>
                                  <div id='dataWrapper' class='dataWrapper'>
                                    <div class="headerComponent">
                                      <div class="rowComponent-3 boxContainer bgGray">
                                        <div class="cellComponent">Business Contact</div>
                                        <div class="cellComponent">Address</div>
                                        <div class="cellComponent">Manage</div>
                                      </div>
                                    </div>
                                    <div class='searchBox'>
                                      <input
                                        type="text"
                                        id="searchBox"
                                        placeholder="Search for Contract..."
                                      />
                                    </div>
                                    <div class="dataContainerWrapper">
                                      ${contractData}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>`;

    if (oneTouchBroadband.length === 0) {
      _errorMessage('Have no Pending Orders!', 'warning');

      contractDataContainer = `
                                <div class="margin-15 features">
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
    const removeDataOne = document.querySelector('#oneTouchContracts');
    if (removeDataOne) removeDataOne.remove();
    const removeDataTwo = document.querySelector('#oneTouchContractInfo');
    if (removeDataTwo) removeDataTwo.remove();

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
