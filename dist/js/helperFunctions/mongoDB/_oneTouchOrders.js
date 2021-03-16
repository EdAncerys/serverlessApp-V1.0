import { persistDOMData } from '../../persistDOMData.js';
import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

async function _oneTouchOrders() {
  console.log('Fetching all orders...');
  _spinner(true, 'Loading Orders...');
  const URL = '/oneTouch/orders';
  const oneTouchOrders = document.querySelector('oneTouchOrders');

  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);

    let orderData = '';
    if (data.length === 0) {
      oneTouchOrders.innerHTML = `<div class='umContainer alignHorizontally noOrders'>
                                    No Order Yet!
                                  </div>`;
    } else {
      data.map((order) => {
        orderData += `<div class='boxContainer'>
                        <div class="orderDataContainer">
                          <div class="tableCell">${order.broadband_name}</div>
                          <div class="tableCell">${order.broadband_provider}</div>
                          <div class="tableCell">${order.broadband_price}</div>
                          <div class="tableCell">${order.broadband_installation}</div>
                        </div>
                        <div class="manageOrderDataComponent">
                          <btnInfoOrder id='${order._id}' name='${order.broadband_name}' value='${order._id}' class="btnB01" role="button">
                            Info
                          </btnInfoOrder>
                          <btnDeleteOrder id='${order._id}' name='${order.broadband_name}' value='${order._id}' class="btnB01" role="button">
                            Delete
                          </btnDeleteOrder>
                        </div>
                      </div>`;
      });

      oneTouchOrders.innerHTML = `<div class='umContainer'>
                                    <div class="orderDataContainer boxContainer">
                                      <div class="tableCell">Supplier</div>
                                      <div class="tableCell">Provider</div>
                                      <div class="tableCell">Price</div>
                                      <div class="tableCell">Installation</div>
                                    </div>
                                    ${orderData}
                                  </div>`;
    }

    persistDOMData('oneTouchBodyContainer', 'live-connections');
    _spinner(false);
  } catch (err) {
    console.log(err);
    _errorMessage(err);
  }
}

export { _oneTouchOrders };
