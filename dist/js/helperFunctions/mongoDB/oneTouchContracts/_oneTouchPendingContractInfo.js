import { persistDOMData } from '../../../persistDOMData.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _oneTouchPendingContractInfo(findOneById) {
  console.log('Fetching placed order information...');
  _spinner(true, 'Pending Order Information...');
  const URL = '/oneTouch/contract/findContractById';
  const access_token = sessionStorage.getItem('access_token');

  let contractInfoData = '';

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
    if (!response.ok) throw new Error(data);

    const data = await response.json();
    console.log(data);
    const contractInfo = data.oneTouch;

    let thoroughfare_number =
      contractInfo.thoroughfare_number === 'null'
        ? ''
        : contractInfo.thoroughfare_number;
    let premises_name =
      contractInfo.premises_name === 'null' ? '' : contractInfo.premises_name;
    let sub_premises =
      contractInfo.sub_premises === 'null' ? '' : contractInfo.sub_premises;
    let thoroughfare_name =
      contractInfo.thoroughfare_name === 'null'
        ? ''
        : contractInfo.thoroughfare_name;
    let county = contractInfo.county === 'null' ? '' : contractInfo.county;
    let postcode = contractInfo.postcode;

    contractInfoData = `
      <div class="outer">
        <inner class="inner">
          <btnLabel>Back</btnLabel>
        </inner>
      </div>

      <div class="features-align-left">
      <div class="flex-container-50">
        <div class="oneTouchFormContainer">
          <div class="fontH3">Contract Information</div>
          <div class="dataSummaryContainer textSilver fontH2">
            <div class="justifyText">
              <label for="fullName">Contract Start Date</label>
              <input
                type="text"
                id="contractStartDate"
                name="fullName"
                placeholder="DD/MM/YYYY"
              />
            </div>
            <div class="justifyText">
              <label for="fullName">Contract Expiration Date</label>
              <input
                type="text"
                id="contractExpirationDate"
                name="fullName"
                placeholder="DD/MM/YYYY"
              />
            </div>

            <div class="justifyText">
              <label for="fullName">Contract Length</label>
                <input
                  type="text"
                  id="contractLength"
                  name="fullName"
                  placeholder="Contract Length..."
                />
            </div>
          </div>
          <div class="fullWidth">
            <submitForm id="addContract" class="btnOneTouch" type="submit">
              Add Contract
            </submitForm>
          </div>
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
                <div class="rowDisplayEnd">${contractInfo.companyName}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Product Type</div>
                <div class="rowDisplayEnd">${contractInfo.productType}</div>
              </div>

              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Company Email</div>
                <div class="rowDisplayEnd">${contractInfo.companyEmail}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Company Phone Number</div>
                <div class="rowDisplayEnd">${contractInfo.companyPhoneNumber}</div>
              </div>

              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Account Manager</div>
                <div class="rowDisplayEnd">${contractInfo.accountManager}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Company Registration</div>
                <div class="rowDisplayEnd">${contractInfo.companyRegistration}</div>
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
                <div class="rowDisplayEnd">${contractInfo.fullName}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Phone Number</div>
                <div class="rowDisplayEnd">${contractInfo.customerPhoneNumber}</div>
              </div>

              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Customer Email</div>
                <div class="rowDisplayEnd">${contractInfo.customerEmail}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">
                  Personal Notes: <br />
                  ${contractInfo.customerNotes}
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
                <div class="rowDisplayEnd">${contractInfo.name}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Broadband Provider</div>
                <div class="rowDisplayEnd">${contractInfo.provider}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Broadband Technology</div>
                <div class="rowDisplayEnd">${contractInfo.technology}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Up Speed</div>
                <div class="rowDisplayEnd">${contractInfo.likely_up_speed}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Down Speed</div>
                <div class="rowDisplayEnd">${contractInfo.likely_down_speed}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Broadband Price</div>
                <div class="rowDisplayEnd">${contractInfo.price}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">
                  Broadband Installation Price
                </div>
                <div class="rowDisplayEnd">${contractInfo.installation}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-container-50">
          <div class="oneTouchFormContainer">
            <div class="fontH3">Site Installation Details</div>
            <div class="dataSummaryContainer textSilver fontH2">
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Contact Name</div>
                <div class="rowDisplayEnd">${contractInfo.contactName}</div>
              </div>
              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Contact Phone Number</div>
                <div class="rowDisplayEnd">${contractInfo.contactPhoneNumber}</div>
              </div>

              <div class="dataRowSummaryContainer justifyText">
                <div class="rowDisplayStart">Contact Email</div>
                <div class="rowDisplayEnd">${contractInfo.contactEmail}</div>
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
      </div>`;

    const oneTouchContractInfo = document.createElement('div');
    oneTouchContractInfo.id = 'userPlacedOrdersInfo';
    oneTouchContractInfo.innerHTML = contractInfoData;

    const userPlacedOrders = document.querySelector('#userPlacedOrders');
    const oneTouchOrders = document.querySelector('oneTouchOrders');
    userPlacedOrders.classList.add('hidden');
    oneTouchOrders.appendChild(oneTouchContractInfo);

    const endPoint = location.href.split('/').slice(-1)[0];
    persistDOMData(endPoint);
    _spinner(false);
  } catch (err) {
    console.log(err);
    _spinner(false);
    _errorMessage(err);
  }
}

export { _oneTouchPendingContractInfo };
