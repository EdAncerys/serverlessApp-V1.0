const _termsAndConditions = () => {
  console.log('Review Terms & Conditions');
  const oneTouchSlider = document.querySelector('#oneTouchSlider');
  const oneTouchBroadbandOrderPageFour = document.querySelector(
    '#oneTouchBroadbandOrderPageFour'
  );
  const oneTouchTermsAndConditions = document.createElement('div');
  oneTouchTermsAndConditions.id = 'oneTouchBroadbandOrderPageFive';

  const data = `   <div class="alignHorizontally">
                    <div class="oneTouchTermsAndConditions">
                      <div class="fontH4">Terms And Conditions</div>
                      <div class="oneTouchTermsAndConditionsText justifyText fontH2">
                        <div>
                          All FTTP Products are available on request. All products exclude
                          DIA at £2 Bespoke pricing and leased lines are available from
                          your account manager
                        </div>
                        <div>
                          The standard chunk of Lorem Ipsum used since the 1500s is
                          reproduced below for those interested. Sections 1.10.32 and
                          1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
                          reproduced in their exact original form, accompanied by English
                          versions from the 1914 translation by H. Rackham.
                        </div>
                      </div>
                      <div class="termsAndConditionsBtn">
                        <agreeWithTermsAndConditions class="Checkbox alignHorizontally">
                          <input id="checkbox" type="checkbox" class="Checkbox-input" />
                          <label for="checkbox" class="Checkbox-label"
                            >I agree to the Terms and Conditions</label
                          >
                        </agreeWithTermsAndConditions>
                        <oneTouchPlaceOrder class="btnOneTouch btnDisable" role="button">
                          Place Broadband Order
                        </oneTouchPlaceOrder>
                      </div>
                    </div>
                  </div>`;

  oneTouchTermsAndConditions.innerHTML = data;

  oneTouchBroadbandOrderPageFour.style.display = 'none';
  oneTouchSlider.appendChild(oneTouchTermsAndConditions);
};

export { _termsAndConditions };
