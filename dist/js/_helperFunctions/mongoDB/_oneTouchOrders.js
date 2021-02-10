import { _deleteOneTouchOrder } from '../mongoDB/_deleteOneTouchOrder.js';
import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

async function _oneTouchOrders() {
  console.log('Fetching all orders...');
  _spinner(true);
  const URL = '/oneTouch/orders';
  const oneTouchOrders = document.querySelector('oneTouchOrders');

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      _spinner(false);
      let list = '';
      data.map((order) => {
        list += `<div class="alignHorizontally">
                  <div class="boxContainer hoverBackground">
                    <div class="tableRowNo6">
                      <div class="tableCell">${order.name}</div>
                      <div class="tableCell">${order.likely_down_speed}</div>
                      <div class="tableCell">${order.likely_up_speed}</div>
                      <div class="tableCell">${order.price}</div>
                      <div class="tableCell">${order.installation}</div>
                      <div class="tableCell">
                        <btnDeleteUser id='${order._id}' value='${order._id}' class="btnOneTouch_V01" role="button">
                          Delete
                        </btnDeleteUser>
                      </div>
                    </div>
                  </div>
                </div>`;
      });

      oneTouchOrders.innerHTML = `<div class="alignHorizontally">
                                  <div id='oneTouchOrderTable' class="boxContainer width_90 height_40">
                                    <div class="boxContainer font_2 backgroundSecondary colorWhite">
                                      <div class="alignHorizontally">
                                        <img src="../../../views/oneTouch/images/color_logo_transparent.png" alt="ndgLogo"/>
                                      </div>
                                      <div class="tableRowNo6">
                                        <div class="tableCell">Supplier</div>
                                        <div class="tableCell">Download Speed</div>
                                        <div class="tableCell">Upload Speed</div>
                                        <div class="tableCell">Price</div>
                                        <div class="tableCell">Installation</div>
                                        <div class="tableCell">Delete Order</div>
                                      </div>
                                    </div>
                                    ${list}
                                  </div>
                                </div>`;

      document
        .getElementById('oneTouchOrderTable')
        .addEventListener('click', (event) => {
          const isButton = event.target.nodeName === 'BTNDELETEORDER';

          if (!isButton) {
            return;
          }

          _deleteOneTouchOrder(event.target.id);
        });

      console.log(data);
    })
    .catch((err) => {
      _spinner(false);
      _errorMessage(err);
      console.log(err);
    });
}

export { _oneTouchOrders };
