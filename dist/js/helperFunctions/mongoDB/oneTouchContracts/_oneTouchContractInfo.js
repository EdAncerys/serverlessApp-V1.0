import { persistDOMData } from '../../../persistDOMData.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _oneTouchContractInfo(findOneById) {
  console.log('Fetching contract information...');
  _spinner(true, 'Loading Active Contract...');
  const URL = '/oneTouch/contract/findContractById';
  const access_token = sessionStorage.getItem('access_token');

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

    const dataWrapper = document.createElement('div');
    dataWrapper.id = 'dataWrapper';
    let dbRowData;
    let customerData = '';
    let customerDataHTML;

    const data = await response.json();
    console.log(data);
    // data.map((customer) => {
    //   dbRowData = `<div class="dbRowData">
    //                         <contractInfo id='${customer._id}' class="btnB01" role="button">
    //                           Info
    //                         </contractInfo>
    //                         <deleteContract id='${customer._id}' class="btnB01 bgDanger" role="button">
    //                           Delete
    //                         </deleteContract>
    //                       </div>`;

    //   customerData += `<div class="rowContainer bgGradientSilver">
    //                     <div class="rowDataContainer-4">
    //                       <div class="rowDataWrapper">
    //                         <div>${customer.oneTouch.companyName}</div>
    //                         <div class="bottomDataRow">${customer.oneTouch.customerFullName}</div>
    //                       </div>
    //                       <div class="rowDataWrapper">
    //                         <div>${customer.oneTouch.customerPhoneNumber}</div>
    //                         <div class="bottomDataRow">${customer.oneTouch.customerEmail}</div>
    //                       </div>
    //                       <div class="rowDataWrapper">
    //                         <div>${customer.oneTouch.thoroughfare_number} ${customer.thoroughfare_name}</div>
    //                         <div class="bottomDataRow">${customer.oneTouch.postcode}</div>
    //                       </div>
    //                       <div class="rowDataWrapper">
    //                         ${dbRowData}
    //                       </div>
    //                     </div>
    //                   </div>`;
    // });

    // const totalContracts = data.length;

    // customerDataHTML = `<div class="features">
    //                       <div class="flex-container-30">
    //                         <div class="oneTouchFormContainer bgGradientSilver">
    //                           <div class="alignHorizontally fontH3">Contract Overview</div>
    //                           <div class="fontH2">
    //                             Manage and overview contracts - anytime, anywhere
    //                           </div>
    //                           <div class="dataSummaryContainer textSilver fontH2">
    //                             <div class="dataRowSummaryContainer justifyText">
    //                               <div class="rowDisplayStart">Total Contracts</div>
    //                               <div class="rowDisplayEnd">${totalContracts}</div>
    //                             </div>
    //                             <div class="dataRowSummaryContainer justifyText">
    //                               <div class="rowDisplayStart">
    //                                 Contracts with exp date > 6 month
    //                               </div>
    //                               <div class="rowDisplayEnd">0</div>
    //                             </div>
    //                             <div class="dataRowSummaryContainer justifyText">
    //                               <div class="rowDisplayStart">
    //                                 Contracts with exp date < 6 month
    //                               </div>
    //                               <div class="rowDisplayEnd">0</div>
    //                             </div>
    //                             <div class="dataRowSummaryContainer justifyText">
    //                               <div class="rowDisplayStart">Expired Contracts</div>
    //                               <div class="rowDisplayEnd">0</div>
    //                             </div>
    //                           </div>
    //                         </div>
    //                       </div>

    //                       <div class="flex-container-70">
    //                         <div class="headerText">
    //                           <div class="fontH4">Contract & Customer List</div>
    //                           <div class="fontH2">
    //                             Manage all customers in one place. View address, contact
    //                             information, etc. & any personal notes.
    //                           </div>
    //                         </div>
    //                         <div id='dataWrapper' class='dataWrapper'>
    //                           <div class="rowDataContainer-4 boxContainer bgGray">
    //                             <div class="rowDataWrapper">Business Contact</div>
    //                             <div class="rowDataWrapper">Contact Details</div>
    //                             <div class="rowDataWrapper">Address</div>
    //                             <div class="rowDataWrapper">Option</div>
    //                           </div>
    //                             ${customerData}
    //                         </div>
    //                       </div>
    //                     </div>`;

    // const oneTouchCustomer = document.createElement('div');
    // oneTouchCustomer.id = 'oneTouchManageCustomerPageTwo';
    // oneTouchCustomer.innerHTML = customerDataHTML;

    // const manageCustomerWrapper = document.querySelector(
    //   '#manageCustomerWrapper'
    // );

    // const removeData = document.querySelector('#oneTouchManageCustomerPageThree');
    // if (removeData) removeData.remove();

    // manageCustomerWrapper.appendChild(oneTouchCustomer);

    // const endPoint = location.href.split('/').slice(-1)[0];
    // persistDOMData(endPoint);
    _spinner(false);
  } catch (err) {
    console.log(err);
    _spinner(false);
    _errorMessage(err);
  }
}

export { _oneTouchContractInfo };
