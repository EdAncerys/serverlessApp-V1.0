import { persistDOMData } from '../../persistDOMData.js';
import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

async function _oneTouchOrders() {
  console.log('Fetching all orders...');
  _spinner(true, 'Loading Orders...');
  const oneTouchOrders = document.querySelector('oneTouchOrders');
  const URL = '/oneTouch/orders';
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
    if (!response.ok) throw new Error(response.statusText);

    const dbData = await response.json();
    const data = dbData.data;
    console.log(data);

    let orderData = '';
    if (data.length === 0) {
      oneTouchOrders.innerHTML = `<section class="features">
                                    <div class="flex-container">
                                      <div class="alignHorizontally fontH5">No Orders Placed!</div>
                                      <placeNewOrder class="btnOneTouch">Place New Order</placeNewOrder>
                                    </div>
                                  </section>
                                  <section class="features">
                                  <div class="flex-container">
                                    <div class="fontH2">
                                      <div class="indexBanner">
                                        <div class="ndgIcon"></div>
                                        <div>Unit 4, Saddlers Court, Oakham LE15 7GH</div>
                                        <div>Phone: 024 7509 2481</div>
                                      </div>
                                    </div>
                                  </div>
                                </section>`;
    } else {
      data.map((order) => {
        orderData += `<div class='rowContainer'>
                        <div class="orderDataContainer">
                          <div class="tableCell">${order.oneTouchData.name}</div>
                          <div class="tableCell">${order.oneTouchData.provider}</div>
                          <div class="tableCell">${order.oneTouchData.price}</div>
                          <div class="tableCell">${order.oneTouchData.installation}</div>
                        </div>
                        <div class="manageOrderDataComponent">
                          <orderInfo id='${order._id}' oneTouchData='${order.oneTouchData}' class="btnB01" role="button">
                            Info
                          </orderInfo>
                          <deleteOrder id='${order._id}' oneTouchData='${order.oneTouchData}' class="btnB01" role="button">
                            Delete
                          </deleteOrder>
                        </div>
                      </div>`;
      });

      oneTouchOrders.innerHTML = `<div>
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
    _spinner(false);
    _errorMessage(err);
  }
}

export { _oneTouchOrders };
