import { _placeBroadbandOrder } from './_placeBroadbandOrder.js';

const _manageOrderData = (
  name,
  provider,
  likely_down_speed,
  likely_up_speed,
  price,
  installation
) => {
  console.table(
    name,
    provider,
    likely_down_speed,
    likely_up_speed,
    price,
    installation
  );
  const oneTouchOrderSlider = document.querySelector('#oneTouchOrderSlider');
  const oneTouchOrderTable = document.querySelector('#oneTouchOrderTable');

  // Save data to session storage
  sessionStorage.setItem('name', name);
  sessionStorage.setItem('provider', provider);
  sessionStorage.setItem('likely_down_speed', likely_down_speed);
  sessionStorage.setItem('likely_up_speed', likely_up_speed);
  sessionStorage.setItem('price', price);
  sessionStorage.setItem('installation', installation);

  const content = `<div class="">
                    <div class="boxContainer hoverBackground">
                      <div class="tableRowBroadbandOrder font_1">
                        <div class="tableCell">${name}</div>
                        <div class="tableCell">${provider}</div>
                        <div class="tableCell">${likely_down_speed}</div>
                        <div class="tableCell">${likely_up_speed}</div>
                        <div class="tableCell">${price}</div>
                        <div class="tableCell">${installation}</div>
                        <div class="tableCell">
                          <btnPlaceOrder name='${name}' 
                              provider='${provider}' 
                              likely_down_speed='${likely_down_speed}' 
                              likely_up_speed='${likely_up_speed}' 
                              price='${price}' 
                              installation='${installation}' 
                              class="btnOneTouch_V01" role="button">
                              Place Order
                          </btnPlaceOrder>
                        </div>
                      </div>
                    </div>
                  </div>`;

  const orderSelectionContainer = document.createElement('div');

  orderSelectionContainer.innerHTML = `<div class="alignHorizontally">
                                        <div id='oneTouchOrderTable' class="width_90 alignHorizontally">
                                          <div class="boxContainer font_2 backgroundSecondary colorWhite">
                                            <div class="tableRowBroadbandOrder">
                                              <div class="tableCell">Supplier</div>
                                              <div class="tableCell">Provider</div>
                                              <div class="tableCell">Download</div>
                                              <div class="tableCell">Upload</div>
                                              <div class="tableCell">Price</div>
                                              <div class="tableCell">Installation</div>
                                              <div class="tableCell">Select</div>
                                            </div>
                                          </div>
                                          ${content}
                                        </div>
                                      </div>`;

  oneTouchOrderTable.classList.add('hidden');
  oneTouchOrderSlider.appendChild(orderSelectionContainer);
  orderSelectionContainer.classList.add('boxContainer');

  document.querySelector('btnPlaceOrder').addEventListener('click', (event) => {
    _placeBroadbandOrder();
  });
};

export { _manageOrderData };
