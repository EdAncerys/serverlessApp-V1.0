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
      const tableCellStyle = `style="border: 1px solid #c1c1c1;
                              color: #2b2b2b;
                              font-size: 16px;
                              font-weight: normal;
                              padding: 20px;
                              text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);"`;

      let content = data.map((order) => {
        return `<tr style="padding: 5px">
                  <th ${tableCellStyle}>${order.name}</th>
                  <th ${tableCellStyle}>${order.likely_down_speed}</th>
                  <th ${tableCellStyle}>${order.likely_up_speed}</th>
                  <th ${tableCellStyle}>${order.price}</th>
                  <th ${tableCellStyle}>${order.installation}</th>
                  <th ${tableCellStyle}>
                    <button id='${order._id}' value='${order._id}' class="btnOneTouch" role="button">
                      Delete
                    </button>
                  </th>
                </tr>`;
      });
      oneTouchOrders.innerHTML = `<div>
                                    <h2 style="display: grid; justify-content: center">All Registered Orders</h2>
                                    <div style="display: grid; justify-content: center; background">
                                    <table style="background-color: #f4f4f4; min-width: 400px; margin: 20px">
                                      <tr>
                                        <th
                                        colspan="6"
                                        style="
                                          color: #f4f4f4;
                                          background: #f7f7f7;
                                          border: 1px solid #343a45;
                                          text-align: center;
                                          text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
                                          vertical-align: middle;
                                          padding: 10px;
                                        "
                                        >
                                          <div style="display: grid; justify-content: center">
                                            <img src="../../../views/oneTouch/images/color_logo_transparent.png" alt="ndgLogo"/>
                                          </div>
                                        </th>
                                      </tr>
                                      <tr style="padding: 5px">
                                        <th ${tableCellStyle}>Supplier</th>
                                        <th ${tableCellStyle}>Download Speed</th>
                                        <th ${tableCellStyle}>Upload Speed</th>
                                        <th ${tableCellStyle}>Price</th>
                                        <th ${tableCellStyle}>Installation</th>
                                        <th ${tableCellStyle}>Delete Order</th>
                                      </tr>
                                        ${content}
                                    </table>
                                    </div>
                                  </div>`;

      console.log(data);
    })
    .catch((err) => {
      _spinner(false);
      _errorMessage(err);
      console.log(err);
    });
}

export { _oneTouchOrders };
