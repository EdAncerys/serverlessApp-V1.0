import { _placeBroadbandOrder } from './_placeBroadbandOrder.js';
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

  const orderData = `<div class="boxContainer backgroundWhiteT01 broadbandDataContainerHover">
                      <div class="broadbandDataContainer">
                        <div class="tableCell">${name}</div>
                        <div class="tableCell">${provider}</div>
                        <div class="tableCell">${likely_down_speed}</div>
                        <div class="tableCell">${likely_up_speed}</div>
                        <div class="tableCell">${price}</div>
                        <div class="tableCell">${installation}</div>
                        <div class="tableCell">
                        <div class='center'>
                          <btnPlaceOrder name='${name}' 
                                          provider='${provider}' 
                                          likely_down_speed='${likely_down_speed}' 
                                          likely_up_speed='${likely_up_speed}' 
                                          price='${price}' 
                                          installation='${installation}' 
                                          class="btnB01" role="button">
                            Select
                          </btnPlaceOrder>
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
                                      <div class="tableCell">Select Deal</div>
                                    </div>
                                      ${orderData}
                                    </div>`;

  oneTouchBroadbandOrderPageThree.style.display = 'none';
  oneTouchSlider.appendChild(oneTouchOrderReview);

  document.querySelector('body').addEventListener('click', (event) => {
    const btnPlaceOrder = event.target.nodeName === 'BTNPLACEORDER';

    if (!btnPlaceOrder) {
      return;
    }
    console.log(event.target.getAttribute('name'));
    // _placeBroadbandOrder(
    //   event.target.getAttribute('name'),
    //   event.target.getAttribute('provider'),
    //   event.target.getAttribute('likely_down_speed'),
    //   event.target.getAttribute('likely_up_speed'),
    //   event.target.getAttribute('price'),
    //   event.target.getAttribute('installation')
    // );
  });
};

export { _manageOrderData };
