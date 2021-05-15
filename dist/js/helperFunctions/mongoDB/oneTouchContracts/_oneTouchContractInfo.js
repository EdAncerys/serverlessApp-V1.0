import { persistDOMData } from '../../../persistDOMData.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _oneTouchContractInfo(findOneById) {
  console.log('Fetching contract information...');
  _spinner(true, 'Loading Active Contract...');
  const endPoint = location.href.split('/').slice(-1)[0];
  const URL = '/oneTouch/contract/findContractById';
  const access_token = sessionStorage.getItem('access_token');

  let oneTouchContractData = '';

  const body = {
    access_token,
    findOneById,
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

    sessionStorage.setItem('oneTouchBroadband', JSON.stringify(data));
    const oneTouchBroadband = data.oneTouchBroadband;
    const contractStartDay = oneTouchBroadband.contractStartDay;
    const contractEndDay = oneTouchBroadband.contractEndDay;
    const oneTouchCustomerData = data.oneTouchCustomer;

    let oneTouchCustomer = [];
    if (oneTouchCustomerData)
      oneTouchCustomer = data.oneTouchCustomer.oneTouchCustomer;

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

    const broadbandOrders = 'broadband-orders';
    const admin = endPoint.includes(broadbandOrders);

    let contractActivationStats = '';
    if (contractStartDay)
      contractActivationStats = `   
                              <div class="flex-container-50">
                                <div class="oneTouchFormContainer">
                                  <div class="fontH3">Contract Information</div>
                                  <div class="dataSummaryContainer textSilver fontH2">
                                    <div class="dataRowSummaryContainer justifyText bgGO">
                                      <div class="rowDisplayStart">Contract Start Day</div>
                                      <div class="rowDisplayEnd">${contractStartDay}</div>
                                    </div>

                                    <div class="dataRowSummaryContainer justifyText bgSTOP">
                                      <div class="rowDisplayStart">Contract End Day</div>
                                      <div class="rowDisplayEnd">${contractEndDay}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>`;

    // Activate contract section
    let activateContract = '';
    if (admin)
      activateContract = ` <div class="features-align-left">
                            <div class="flex-container-50">
                              <div class="oneTouchFormContainer">
                                <div id="oneTouchIconContainer">
                                  <div class="oneTouchIcon"></div>
                                </div>

                                <form action="/">
                                  <label for="fname">Contract Start Day</label>
                                  <input
                                    type="date"
                                    id="contractStartDay"
                                    name="name"
                                    placeholder="DD/MM/YYYY"
                                  />

                                  <label for="lname">Contract End Day</label>
                                  <input
                                    type="date"
                                    id="contractEndDay"
                                    name="name"
                                    placeholder="DD/MM/YYYY"
                                  />

                                  <label for="subject">Contract Notes</label>
                                  <textarea
                                    id="contractNotes"
                                    name="contractDescription"
                                    placeholder="Relative Notes..."
                                    style="height: 200px"
                                  ></textarea>

                                  <submitForm>
                                    <input
                                      id="activateContract"
                                      class="btnOneTouch"
                                      type="submit"
                                      value="Activate Contract"
                                    />
                                  </submitForm>
                                </form>
                              </div>
                            </div>

                            ${contractActivationStats}
                          </div>`;

    oneTouchContractData = `
                          <div class="features">
                            <div class="flex-container-100">
                              <div class="outer">
                                <inner class="inner">
                                  <btnLabel>Back</btnLabel>
                                </inner>
                              </div>
                            </div>
                          </div>

      ${activateContract}

      <div class="features">
        <div class="flex-container-50">
          <div class="oneTouchFormContainer">
            <div class="fontH3">Company Information</div>
            <div class="dataSummaryContainer textSilver fontH2">
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Company Name</div>
                <div class="rowDisplayEnd">${oneTouchCustomer.companyName}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Product Type</div>
                <div class="rowDisplayEnd">${oneTouchCustomer.productType}</div>
              </div>

              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Company Email</div>
                <div class="rowDisplayEnd">${oneTouchCustomer.companyEmail}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Company Phone Number</div>
                <div class="rowDisplayEnd">${oneTouchCustomer.companyPhoneNumber}</div>
              </div>

              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Account Manager</div>
                <div class="rowDisplayEnd">${oneTouchCustomer.accountManager}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Company Registration</div>
                <div class="rowDisplayEnd">${oneTouchCustomer.companyRegistration}</div>
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
                <div class="rowDisplayEnd">${oneTouchCustomer.customerFullName}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Phone Number</div>
                <div class="rowDisplayEnd">${oneTouchCustomer.customerPhoneNumber}</div>
              </div>

              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Customer Email</div>
                <div class="rowDisplayEnd">${oneTouchCustomer.customerEmail}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">
                  Personal Notes: <br />
                  ${oneTouchCustomer.customerNotes}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="features">
        <div class="flex-container-50">
          <div class="oneTouchFormContainer">
            <div class="fontH3">Broadband Information</div>
            <div class="dataSummaryContainer textSilver fontH2">
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Broadband Name</div>
                <div class="rowDisplayEnd">${oneTouchBroadband.name}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Broadband Provider</div>
                <div class="rowDisplayEnd">${oneTouchBroadband.provider}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Broadband Technology</div>
                <div class="rowDisplayEnd">${oneTouchBroadband.technology}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Up Speed</div>
                <div class="rowDisplayEnd">${oneTouchBroadband.likely_up_speed}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Down Speed</div>
                <div class="rowDisplayEnd">${oneTouchBroadband.likely_down_speed}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Broadband Price</div>
                <div class="rowDisplayEnd">${oneTouchBroadband.price}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">
                  Broadband Installation Price
                </div>
                <div class="rowDisplayEnd">${oneTouchBroadband.installation}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-container-50">
          <div class="oneTouchFormContainer">
            <div class="fontH3">Contract Details</div>
            <div class="dataSummaryContainer textSilver fontH2">
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Installation Date</div>
                <div class="rowDisplayEnd">${oneTouchBroadband.installationDate}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Contact Expiration Date</div>
                <div class="rowDisplayEnd">${oneTouchBroadband.expansionDate}</div>
              </div>

              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Contact Length</div>
                <div class="rowDisplayEnd">${oneTouchBroadband.contractLength}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Contract Price</div>
                <div class="rowDisplayEnd">${oneTouchBroadband.price}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="features-align-left">
        <div class="flex-container-50">
          <div class="oneTouchFormContainer">
            <div class="fontH3">Site Installation Details</div>
            <div class="dataSummaryContainer textSilver fontH2">
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Contact Name</div>
                <div class="rowDisplayEnd">${oneTouchCustomer.contactName}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Contact Phone Number</div>
                <div class="rowDisplayEnd">${oneTouchCustomer.contactPhoneNumber}</div>
              </div>

              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Contact Email</div>
                <div class="rowDisplayEnd">${oneTouchCustomer.contactEmail}</div>
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

        ${contractActivationStats}
      </div>`;

    const oneTouchContractInfo = document.createElement('div');
    oneTouchContractInfo.id = 'oneTouchContractInfo';
    oneTouchContractInfo.innerHTML = oneTouchContractData;

    const liveConnections = document.querySelector('#liveConnections');

    const hideData = document.querySelector('#oneTouchContracts');
    hideData.classList.add('hidden');

    liveConnections.appendChild(oneTouchContractInfo);

    persistDOMData(endPoint);
    _spinner(false);
  } catch (err) {
    console.log(err);
    _spinner(false);
    _errorMessage(err);
  }
}

export { _oneTouchContractInfo };
