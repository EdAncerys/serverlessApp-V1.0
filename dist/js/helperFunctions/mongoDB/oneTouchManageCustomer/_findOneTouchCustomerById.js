import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';
import { persistDOMData } from '../../../persistDOMData.js';

async function _findOneTouchCustomerById(id, displayData) {
  console.log('Fetching Customer Data...');
  _spinner(true, 'Loading Customer Information...');
  const URL = '/oneTouch/customer/findCustomerById';
  const access_token = sessionStorage.getItem('access_token');

  const endPoint = location.href.split('/').slice(-1)[0];
  const connectionChecker = 'connection-checker';
  const manageCustomer = 'manage-customer';
  let customerInfoData = '';

  const body = {
    findOneById: id,
    access_token,
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

    if (displayData) {
      const customerInfo = data.oneTouchCustomer;

      let thoroughfare_number =
        customerInfo.thoroughfare_number === 'null'
          ? ''
          : customerInfo.thoroughfare_number;
      let premises_name =
        customerInfo.premises_name === 'null' ? '' : customerInfo.premises_name;
      let sub_premises =
        customerInfo.sub_premises === 'null' ? '' : customerInfo.sub_premises;
      let thoroughfare_name =
        customerInfo.thoroughfare_name === 'null'
          ? ''
          : customerInfo.thoroughfare_name;
      let county = customerInfo.county === 'null' ? '' : customerInfo.county;
      let postcode = customerInfo.postcode;

      customerInfoData = `
                          <div class="features">
                            <div class="flex-container-100">
                              <div class="outer">
                                <inner class="inner">
                                  <btnLabel>Back</btnLabel>
                                </inner>
                              </div>
                            </div>
                          </div>
                          
                          <div class="features">
                            <div class="flex-container-50">
                              <div class="oneTouchFormContainer">
                                <div class="fontH3">Company Information</div>
                                <div class="dataSummaryContainer textSilver fontH2">
                                  <div class="dataRowSummaryContainer justifyText">
                                    <div class="rowDisplayStart">Company Name</div>
                                    <div class="rowDisplayEnd">${
                                      customerInfo.companyName
                                    }</div>
                                  </div>
                                  <div class="dataRowSummaryContainer justifyText">
                                    <div class="rowDisplayStart">Product Type</div>
                                    <div class="rowDisplayEnd">${
                                      customerInfo.productType
                                    }</div>
                                  </div>

                                  <div class="dataRowSummaryContainer justifyText">
                                    <div class="rowDisplayStart">Company Email</div>
                                    <div class="rowDisplayEnd">${
                                      customerInfo.companyEmail
                                    }</div>
                                  </div>
                                  <div class="dataRowSummaryContainer justifyText">
                                    <div class="rowDisplayStart">Company Phone Number</div>
                                    <div class="rowDisplayEnd">${
                                      customerInfo.companyPhoneNumber
                                    }</div>
                                  </div>

                                  <div class="dataRowSummaryContainer justifyText">
                                    <div class="rowDisplayStart">Account Manager</div>
                                    <div class="rowDisplayEnd">${
                                      customerInfo.accountManager
                                    }</div>
                                  </div>
                                  <div class="dataRowSummaryContainer justifyText">
                                    <div class="rowDisplayStart">Company Registration</div>
                                    <div class="rowDisplayEnd">${
                                      customerInfo.companyRegistration
                                    }</div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="flex-container-50">
                              <div class="oneTouchFormContainer">
                                <div class="fontH3">Customer Information</div>
                                <div class="dataSummaryContainer textSilver fontH2">
                                  <div class="dataRowSummaryContainer justifyText">
                                    <div class="rowDisplayStart">Full Name</div>
                                    <div class="rowDisplayEnd">${
                                      customerInfo.customerFullName
                                    }</div>
                                  </div>
                                  <div class="dataRowSummaryContainer justifyText">
                                    <div class="rowDisplayStart">Phone Number</div>
                                    <div class="rowDisplayEnd">${
                                      customerInfo.customerPhoneNumber
                                    }</div>
                                  </div>

                                  <div class="dataRowSummaryContainer justifyText">
                                    <div class="rowDisplayStart">Customer Email</div>
                                    <div class="rowDisplayEnd">${
                                      customerInfo.customerEmail
                                    }</div>
                                  </div>
                                  <div class="dataRowSummaryContainer justifyText">
                                    <div class="rowDisplayStart">
                                      Personal Notes: <br />
                                      ${customerInfo.customerNotes}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="features">
                            <div class="flex-container-50">
                              <div class="oneTouchFormContainer">
                                <div class="fontH3">Site Installation Details</div>
                                <div class="dataSummaryContainer textSilver fontH2">
                                  <div class="dataRowSummaryContainer justifyText">
                                    <div class="rowDisplayStart">Contact Name</div>
                                    <div class="rowDisplayEnd">${
                                      customerInfo.contactName
                                    }</div>
                                  </div>
                                  <div class="dataRowSummaryContainer justifyText">
                                    <div class="rowDisplayStart">Contact Phone Number</div>
                                    <div class="rowDisplayEnd">${
                                      customerInfo.contactPhoneNumber
                                    }</div>
                                  </div>

                                  <div class="dataRowSummaryContainer justifyText">
                                    <div class="rowDisplayStart">Contact Email</div>
                                    <div class="rowDisplayEnd">${
                                      customerInfo.contactEmail
                                    }</div>
                                  </div>
                                  <div class="dataRowSummaryContainer justifyText">
                                    <div class="rowDisplayStart">
                                      Installation Address: <br />
                                      ${thoroughfare_number} ${premises_name} ${sub_premises} ${thoroughfare_name} ${county} ${postcode}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="flex-container-50">
                              <div class="oneTouchFormContainer">
                                <div class="fontH3">Extra Metrics</div>
                                <div class="dataSummaryContainer textSilver fontH2">
                                  <div class="dataRowSummaryContainer justifyText">
                                    <div class="rowDisplayStart">Extra Metrics</div>
                                    <div class="rowDisplayEnd">${'extra metrics'}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>`;

      const oneTouchCustomerInfo = document.createElement('div');
      oneTouchCustomerInfo.id = 'oneTouchCustomerInfo';
      oneTouchCustomerInfo.innerHTML = customerInfoData;

      let appendData = '';
      let hideData = '';

      // manage-customer DOM
      if (endPoint.includes(manageCustomer))
        appendData = document.querySelector('#liveConnectionsContainer');
      if (endPoint.includes(manageCustomer))
        hideData = document.querySelector('#oneTouchCustomerList');

      // connection-checker DOM
      if (endPoint.includes(connectionChecker))
        appendData = document.querySelector('#oneTouchBroadbandContainer');
      if (endPoint.includes(connectionChecker))
        hideData = document.querySelector('#oneTouchCustomerList');

      hideData.classList.add('hidden');
      appendData.appendChild(oneTouchCustomerInfo);

      persistDOMData(endPoint);
    }

    _spinner(false);
    return data;
  } catch (err) {
    console.log(err);
    _spinner(false);
    _errorMessage(err);

    return err;
  }
}

export { _findOneTouchCustomerById };
