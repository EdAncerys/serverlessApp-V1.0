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
                                    <div class="flex-container-30">
                                      <div class="alignHorizontally fontH5">No Orders Placed!</div>
                                      <placeNewOrder class="btnOneTouch">Place New Order</placeNewOrder>
                                    </div>
                                  </section>
                                  <section class="features">
                                  <div class="flex-container-30">
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
        orderData += `<div class="boxContainer bgGradientSilver broadbandDataContainerHover fontH2">
                        <div class="broadbandDataContainer">
                          <div class="tableCell">${order.oneTouchData.name}</div>
                          <div class="tableCell">${order.oneTouchData.provider}</div>
                          <div class="tableCell">${order.oneTouchData.price}</div>
                          <div class="tableCell">${order.oneTouchData.installation}</div>
                          <div>
                            <orderInfo id='${order._id}' oneTouchData='${order.oneTouchData}' class="btnB01" role="button">
                              Info
                            </orderInfo>
                          </div>
                          <div>
                          <deleteOrder id='${order._id}' oneTouchData='${order.oneTouchData}' class="btnB01 bgDanger" role="button">
                            Delete
                          </deleteOrder>
                        </div>
                        </div>
                      </div>`;
      });

      oneTouchOrders.innerHTML = `<div class='alignHorizontally'>
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
                                  </div>`;
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

export { _oneTouchOrders };
