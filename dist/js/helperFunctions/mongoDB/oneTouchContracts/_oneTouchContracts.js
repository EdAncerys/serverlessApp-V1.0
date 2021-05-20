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

    let manageDataContainer = '';
    let contractData = '';
    let contractDataContainer = '';

    const totalContracts = oneTouchBroadband.length;
    let totalPendingContracts = 0;
    let sixMonthPlusContracts = 0;
    let sixMonthContracts = 0;
    let expiredContracts = 0;

    oneTouchBroadband.map((contract) => {
      console.log(contract);
      const contractStartDay = contract.oneTouchBroadband.contractStartDay;

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

      let btnClass = 'btnB01';
      let rowComponent = '';
      let pendingOrder = '';
      let bgContract = 'bgGray';
      let contractEndDay = '';

      // contract expiration day
      const today = new Date();
      if (contractStartDay)
        contractEndDay = new Date(contract.oneTouchBroadband.contractEndDay);
      const sixMonthsFromNow = new Date();
      sixMonthsFromNow.setMonth(today.getMonth() + 7);

      if (contractEndDay < today && contractStartDay) {
        expiredContracts += 1;
        bgContract = 'bgSTOP';
      }
      if (contractEndDay < sixMonthsFromNow && contractEndDay > today) {
        sixMonthContracts += 1;
        bgContract = 'bgSET';
      }
      if (contractEndDay > sixMonthsFromNow) {
        sixMonthPlusContracts += 1;
        bgContract = 'bgGO';
      }

      if (!contractStartDay) {
        totalPendingContracts += 1;
        btnClass = 'btnB01 btnDisable';
        rowComponent = 'rowInactive';
        pendingOrder = 'Pending Order...';
      }

      manageDataContainer = `<div class="manageDataContainer">
                            <contractInfo id='${id}' class="${btnClass}" role="button">
                              Info
                            </contractInfo>
                            <deleteContract id='${id}' class="${btnClass} bgDanger" role="button">
                              Delete
                            </deleteContract>
                          </div>`;

      if (oneTouchCustomer.length !== 0)
        contractData += `
                          <searchRowComponent>
                            <div class="rowContainer ${bgContract}">
                              <div class="pendingOrder">${pendingOrder}</div>
                              <div class="rowComponent-3 ${rowComponent}">
                                <div class="cellComponent">
                                  <search>${oneTouchCustomer.companyName}</search>
                                  <search class="bottomDataRow">${oneTouchCustomer.customerFullName}</search>
                                </div>
                                <div class="cellComponent">
                                  <search>${thoroughfare_number} ${premises_name} ${sub_premises} ${thoroughfare_name} ${county}</search>
                                  <search class="bottomDataRow">${postcode}</search>
                                </div>
                                <div class="cellComponent">
                                  ${manageDataContainer}
                                </div>
                              </div>
                            </div>
                          </searchRowComponent>`;

      if (oneTouchCustomer.length === 0)
        contractData += `
                          <searchRowComponent>
                            <div class="rowContainer ${bgContract}">
                              <div class="rowComponent-1 ${rowComponent}">
                                <search class="alignHorizontally textDanger">Customer Information Not Available. Please Contact Your Account Manager</search>
                              </div>
                            </div>
                          <searchRowComponent>`;
    });

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
                                <div class="dataRowSummaryContainer justifyText">
                                  <div class="rowDisplayStart">Pending Contracts</div>
                                  <div class="rowDisplayEnd">${totalPendingContracts}</div>
                                </div>
                                <div class="dataRowSummaryContainer justifyText bgGO">
                                  <div class="rowDisplayStart">
                                    Contracts EXD > 6 month
                                  </div>
                                  <div class="rowDisplayEnd">${sixMonthPlusContracts}</div>
                                </div>
                                <div class="dataRowSummaryContainer justifyText bgSET">
                                  <div class="rowDisplayStart">
                                    Contracts EXD < 6 month
                                  </div>
                                  <div class="rowDisplayEnd">${sixMonthContracts}</div>
                                </div>
                                <div class="dataRowSummaryContainer justifyText bgSTOP">
                                  <div class="rowDisplayStart">Expired Contracts</div>
                                  <div class="rowDisplayEnd">${expiredContracts}</div>
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
                                <div class="alignHorizontally fontH4">Live Contracts & Customer List</div>
                                <div class="alignHorizontally textSilver fontH2">
                                  Manage all contracts in one place. View address, contact
                                  information, etc. & any personal notes.
                                </div>
                              </div>
                              <div id='dataWrapper' class='dataWrapper'>
                                <div class="rowComponent-3 boxContainer bgGray">
                                  <div class="cellComponent">Business Contact</div>
                                  <div class="cellComponent">Address</div>
                                  <div class="cellComponent">Manage</div>
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
      _errorMessage('Have No Placed Contract!', 'warning');

      contractDataContainer = `
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
                                      <addNewContract class="btnOneTouch">Add New Contract</addNewContract>
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
  } catch (error) {
    console.log(error);
    _spinner(false);
    _errorMessage(error.msg);
  }
}

export { _oneTouchContracts };
