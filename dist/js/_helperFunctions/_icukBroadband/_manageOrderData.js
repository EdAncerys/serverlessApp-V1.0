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

  // Removing user previous data
  const removeData = document.querySelector('#oneTouchBroadbandOrderPageFour');
  if (removeData) removeData.remove();

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
                          <termsAndConditions class="btnB01" role="button">
                            Place Order
                          </termsAndConditions>
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

  oneTouchBroadbandOrderPageThree.classList.add('hidden');
  oneTouchSlider.appendChild(oneTouchOrderReview);
};

export { _manageOrderData };
