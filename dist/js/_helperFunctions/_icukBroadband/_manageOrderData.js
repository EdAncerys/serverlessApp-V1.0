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
  const oneTouchOrderSlider = document.querySelector('#oneTouchOrderSlider');
  const oneTouchBoradbandDeals = document.querySelector(
    '#oneTouchBoradbandDeals'
  );
  const orderSelectionContainer = document.createElement('div');
  orderSelectionContainer.id = 'orderSelectionContainer';

  // Save data to session storage
  sessionStorage.setItem('name', name);
  sessionStorage.setItem('provider', provider);
  sessionStorage.setItem('likely_down_speed', likely_down_speed);
  sessionStorage.setItem('likely_up_speed', likely_up_speed);
  sessionStorage.setItem('price', price);
  sessionStorage.setItem('installation', installation);

  const orderData = `<div class="boxContainer broadbandDataContainerHover">
                    <div class="broadbandDataContainer">
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
                                        class="btnB01" role="button">
                          Place Order
                        </btnPlaceOrder>
                    </div>
                    </div>
                  </div>`;

  orderSelectionContainer.innerHTML = `<div class='umContainer'>
                                        <div class="boxContainer broadbandDataContainer">
                                          <div class="tableCell">Supplier</div>
                                          <div class="tableCell">Provider</div>
                                          <div class="tableCell">Download</div>
                                          <div class="tableCell">Upload</div>
                                          <div class="tableCell">Price</div>
                                          <div class="tableCell">Installation</div>
                                          <div class="tableCell">Select Deal</div>
                                        </div>
                                        ${orderData}
                                      </div>
                                        <div class='sliderNavBtn'>
                                        <div id='sliderPageThree' class="btnB01">Go Back</div>
                                        <div></div>
                                      </div>`;

  oneTouchBoradbandDeals.style.display = 'none';
  oneTouchOrderSlider.appendChild(orderSelectionContainer);

  document.getElementById('sliderPageThree').addEventListener('click', () => {
    _errorMessage('Go To Page Three', 'success');
  });

  document.querySelector('body').addEventListener('click', (event) => {
    const btnPlaceOrder = event.target.nodeName === 'BTNPLACEORDER';

    if (!btnPlaceOrder) {
      return;
    }
    console.log('select');
    _placeBroadbandOrder(
      event.target.getAttribute('name'),
      event.target.getAttribute('provider'),
      event.target.getAttribute('likely_down_speed'),
      event.target.getAttribute('likely_up_speed'),
      event.target.getAttribute('price'),
      event.target.getAttribute('installation')
    );
  });
};

export { _manageOrderData };
