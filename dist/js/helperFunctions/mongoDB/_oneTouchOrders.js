import { persistDOMData } from '../../persistDOMData.js';
import { _deleteOneTouchOrder } from '../mongoDB/_deleteOneTouchOrder.js';
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

    _spinner(false);
    persistDOMData('oneTouchBodyContainer', 'live-connections');

    document.querySelector('body').addEventListener('click', (event) => {
      const btnInfoOrder = event.target.nodeName === 'BTNINFOORDER';
      const btnDeleteOrder = event.target.nodeName === 'BTNDELETEORDER';

      let id = event.target.getAttribute('id');
      let name = event.target.getAttribute('name');

      if (btnInfoOrder) {
        console.log(name);
        _errorMessage(name, 'success');
      }
      if (btnDeleteOrder) {
        console.log(name);
        _deleteOneTouchOrder(id);
        _errorMessage(`Order will be deleted! Order ${name} `);
      }
    });
  } catch (err) {
    console.log(err);
    _errorMessage(err);
  }
}

export { _oneTouchOrders };
