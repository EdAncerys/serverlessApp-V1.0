import { persistDOMData } from '../../../persistDOMData.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _oneTouchAllPlacedOrders() {
  console.log('Fetching all orders...');
  _spinner(true, 'Loading Orders...');
  const oneTouchOrders = document.querySelector('#broadbandOrdersWrapper');
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

    // Removing user previous data
    const removeData = document.querySelector('#oneTouchBroadband');
    if (removeData) removeData.remove();

    const oneTouchBroadbandData = document.createElement('div');
    oneTouchBroadbandData.id = `oneTouchBroadbandData`;
    oneTouchOrders.appendChild(oneTouchBroadbandData);
    let manageDataContainer;
    let orderData = '';

    if (oneTouchBroadband.length === 0) {
      _errorMessage('Have no Pending Orders!', 'warning');

      userPlacedOrders.innerHTML = `<section class="features">
                                    <div class="flex-container-60">
                                      <div class="fontH5">Have No Pending Orders!</div>
                                    </div>
                                  </section>
                                  <section class="features">
                                    <div class="flex-container-60">
                                      <placeNewOrder class="btnOneTouch">Place New Order</placeNewOrder>
                                    </div>
                                  </section>`;
    } else {
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

        orderData += `<div class="rowContainer bgGradientSilver">
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

      oneTouchBroadbandData.innerHTML = `<section class="features">
                                    <div class="flex-container-90">
                                      <div class="headerMsgTitle">
                                        <div class="fontH4">Manage All Placed Orders</div>
                                        <div class="fontH2">Manage all placed orders in one place with a touch of a finger!</div>
                                      </div>
                                      <div class="boxContainer broadbandDataContainer-C7 bgWhite">
                                        <div class="tableCell">oneTouch User</div>
                                        <div class="tableCell">Supplier</div>
                                        <div class="tableCell">Download</div>
                                        <div class="tableCell">Upload</div>
                                        <div class="tableCell">Price</div>
                                        <div class="tableCell">Information</div>
                                        <div class="tableCell">Delete Order</div>
                                      </div>
                                      ${orderData}
                                    </div>
                                  </section>`;
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

export { _oneTouchAllPlacedOrders };
