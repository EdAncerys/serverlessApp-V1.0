const _manageOrderData = () => {
  console.log('Review Terms & Conditions');
  const oneTouchSlider = document.querySelector('#oneTouchSlider');
  const oneTouchBroadbandOrderPageFour = document.querySelector(
    '#oneTouchBroadbandOrderPageFour'
  );
  const oneTouchTermsAndConditions = document.createElement('div');
  oneTouchTermsAndConditions.id = 'oneTouchBroadbandOrderPageFive';

  const data = `<div class="boxContainer backgroundWhiteT01 broadbandDataContainerHover fontH2">
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

  oneTouchTermsAndConditions.innerHTML = data;

  oneTouchBroadbandOrderPageFour.style.display = 'none';
  oneTouchSlider.appendChild(oneTouchTermsAndConditions);
};

export { _manageOrderData };
