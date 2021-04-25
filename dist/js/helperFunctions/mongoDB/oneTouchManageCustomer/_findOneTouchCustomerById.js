import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';
import { persistDOMData } from '../../../persistDOMData.js';

async function _findOneTouchCustomerById(id) {
  console.log('Fetching Customer Data...');
  _spinner(true, 'Loading Customer Information...');
  const URL = '/oneTouch/customer/findCustomerById';
  const access_token = sessionStorage.getItem('access_token');

  const endPoint = location.href.split('/').slice(-1)[0];
  const connectionChecker = 'connection-checker';
  const addressBook = 'address-book';
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

    const customerInfo = data;

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
    <div class="outer">
      <inner class="inner">
        <label>Back</label>
      </inner>
    </div>

    <div class="features">
      <div class="flex-container-50">
        <div class="oneTouchFormContainer">
          <div class="fontH3">Company Information</div>
          <div class="dataSummaryContainer textSilver fontH2">
            <div class="dataRowSummaryContainer justifyText">
              <div class="rowDisplayStart">Company Name</div>
              <div class="rowDisplayEnd">${customerInfo.companyName}</div>
            </div>
            <div class="dataRowSummaryContainer justifyText">
              <div class="rowDisplayStart">Product Type</div>
              <div class="rowDisplayEnd">${customerInfo.productType}</div>
            </div>

            <div class="dataRowSummaryContainer justifyText">
              <div class="rowDisplayStart">Company Email</div>
              <div class="rowDisplayEnd">${customerInfo.companyEmail}</div>
            </div>
            <div class="dataRowSummaryContainer justifyText">
              <div class="rowDisplayStart">Company Phone Number</div>
              <div class="rowDisplayEnd">${
                customerInfo.companyPhoneNumber
              }</div>
            </div>

            <div class="dataRowSummaryContainer justifyText">
              <div class="rowDisplayStart">Account Manager</div>
              <div class="rowDisplayEnd">${customerInfo.accountManager}</div>
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
              <div class="rowDisplayEnd">${customerInfo.fullName}</div>
            </div>
            <div class="dataRowSummaryContainer justifyText">
              <div class="rowDisplayStart">Phone Number</div>
              <div class="rowDisplayEnd">${
                customerInfo.customerPhoneNumber
              }</div>
            </div>

            <div class="dataRowSummaryContainer justifyText">
              <div class="rowDisplayStart">Customer Email</div>
              <div class="rowDisplayEnd">${customerInfo.customerEmail}</div>
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
          <div class="fontH3">Contract Details</div>
          <div class="dataSummaryContainer textSilver fontH2">
            <div class="dataRowSummaryContainer justifyText">
              <div class="rowDisplayStart">Installation Date</div>
              <div class="rowDisplayEnd">${customerInfo.installationDate}</div>
            </div>
            <div class="dataRowSummaryContainer justifyText">
              <div class="rowDisplayStart">Contact Expiration Date</div>
              <div class="rowDisplayEnd">${customerInfo.expansionDate}</div>
            </div>

            <div class="dataRowSummaryContainer justifyText">
              <div class="rowDisplayStart">Contact Length</div>
              <div class="rowDisplayEnd">${customerInfo.contractLength}</div>
            </div>
            <div class="dataRowSummaryContainer justifyText">
              <div class="rowDisplayStart">Contract Price</div>
              <div class="rowDisplayEnd">${customerInfo.price}</div>
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
              <div class="rowDisplayEnd">${customerInfo.contactName}</div>
            </div>
            <div class="dataRowSummaryContainer justifyText">
              <div class="rowDisplayStart">Contact Phone Number</div>
              <div class="rowDisplayEnd">${
                customerInfo.contactPhoneNumber
              }</div>
            </div>

            <div class="dataRowSummaryContainer justifyText">
              <div class="rowDisplayStart">Contact Email</div>
              <div class="rowDisplayEnd">${customerInfo.contactEmail}</div>
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
    </div>

    <div class="features-align-left">
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

    // address-book DOM
    if (endPoint.includes(addressBook))
      appendData = document.querySelector('#addressBookContainer');
    if (endPoint.includes(addressBook))
      hideData = document.querySelector('#oneTouchCustomerList');

    hideData.classList.add('hidden');
    appendData.appendChild(oneTouchCustomerInfo);

    persistDOMData(endPoint);

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
