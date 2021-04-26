import { persistDOMData } from '../../../persistDOMData.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _oneTouchAllPlacedOrders() {
  console.log('Fetching all orders...');
  _spinner(true, 'Loading Orders...');
  const oneTouchOrders = document.querySelector('oneTouchOrders');
  const URL = '/oneTouch/orders/oneTouchOrders';
  const access_token = await sessionStorage.getItem('access_token');

  const body = {
    access_token,
  };
  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  // Removing user previous data
  const removeData = document.querySelector('#userPlacedOrders');
  if (removeData) removeData.remove();

  const userPlacedOrders = document.createElement('div');
  userPlacedOrders.id = `userPlacedOrders`;
  oneTouchOrders.appendChild(userPlacedOrders);

  try {
    const response = await fetch(URL, config);
    if (!response.ok) throw new Error(response.statusText);

    const dbData = await response.json();
    const data = dbData.data;
    console.log(data);

    let orderData = '';
    if (data.length === 0) {
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
      data.map((order) => {
        orderData += `<div class="boxContainer bgGradientSilver broadbandDataContainerHover fontH2">
                        <div class="broadbandDataContainer">
                          <div class="tableCell">${order.oneTouch.name}</div>
                          <div class="tableCell">${order.oneTouch.provider}</div>
                          <div class="tableCell">${order.oneTouch.price}</div>
                          <div class="tableCell">${order.oneTouch.installation}</div>
                          <div>
                            <orderInfo id='${order._id}' oneTouch='${order.oneTouch}' class="btnB01" role="button">
                              Info
                            </orderInfo>
                          </div>
                          <div>
                          <deleteOrder id='${order._id}' oneTouch='${order.oneTouch}' class="btnB01 bgDanger" role="button">
                            Delete
                          </deleteOrder>
                        </div>
                        </div>
                      </div>`;
      });

      userPlacedOrders.innerHTML = `<section class="features">
                                    <div class="flex-container-30">
                                      <div class="headerMsgTitle">
                                        <div class="fontH4">Manage All Placed Orders</div>
                                        <div class="fontH2">Manage all placed orders in one place with a touch of a finger!</div>
                                      </div>
                                      <div class="boxContainer broadbandDataContainer bgWhite">
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
