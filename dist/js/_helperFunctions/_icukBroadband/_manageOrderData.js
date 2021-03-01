import { _errorMessage } from '../_errorMessage.js';

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
  const oneTouchSlider = document.querySelector('#oneTouchSlider');
  const oneTouchBroadbandOrderPageThree = document.querySelector(
    '#oneTouchBroadbandOrderPageThree'
  );
  const oneTouchOrderReview = document.createElement('div');
  oneTouchOrderReview.id = 'oneTouchBroadbandOrderPageFour';

  // Save data to session storage
  sessionStorage.setItem('name', name);
  sessionStorage.setItem('provider', provider);
  sessionStorage.setItem('likely_down_speed', likely_down_speed);
  sessionStorage.setItem('likely_up_speed', likely_up_speed);
  sessionStorage.setItem('price', price);
  sessionStorage.setItem('installation', installation);

  const orderData = `<div class="boxContainer backgroundWhiteT01 broadbandDataContainerHover fontH2">
                      <div class="broadbandDataContainer">
                        <div class="tableCell">${name}</div>
                        <div class="tableCell">${provider}</div>
                        <div class="tableCell">${likely_down_speed}</div>
                        <div class="tableCell">${likely_up_speed}</div>
                        <div class="tableCell">${price}</div>
                        <div class="tableCell">${installation}</div>
                        <div class="tableCell">
                        <div class='center'>
                          <placeOrder name='${name}' 
                                          provider='${provider}' 
                                          likely_down_speed='${likely_down_speed}' 
                                          likely_up_speed='${likely_up_speed}' 
                                          price='${price}' 
                                          installation='${installation}' 
                                          class="btnB01" role="button">
                            Order
                          </placeOrder>
                        </div>
                      </div>
                      </div>
                    </div>`;

  oneTouchOrderReview.innerHTML = `<div class='alignHorizontally'>
                                    <div class="boxContainer broadbandDataContainer backgroundWhite">
                                      <div class="tableCell">Supplier</div>
                                      <div class="tableCell">Provider</div>
                                      <div class="tableCell">Download</div>
                                      <div class="tableCell">Upload</div>
                                      <div class="tableCell">Price</div>
                                      <div class="tableCell">Installation</div>
                                      <div class="tableCell">Order</div>
                                    </div>
                                      ${orderData}
                                    </div>`;

  oneTouchBroadbandOrderPageThree.style.display = 'none';
  oneTouchSlider.appendChild(oneTouchOrderReview);
};

export { _manageOrderData };
