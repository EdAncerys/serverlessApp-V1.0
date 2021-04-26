import { persistDOMData } from '../../persistDOMData.js';

async function _termsAndConditions() {
  console.log('Review Terms & Conditions');

  try {
    // Removing user previous data
    const removeData = document.querySelector(
      '#oneTouchBroadbandOrderPageFive'
    );
    if (removeData) removeData.remove();

    const oneTouchBroadbandContainer = document.querySelector(
      '#oneTouchBroadbandContainer'
    );
    const oneTouchBroadbandOrderPageFour = document.querySelector(
      '#oneTouchBroadbandOrderPageFour'
    );
    const oneTouchTermsAndConditions = document.createElement('div');
    oneTouchTermsAndConditions.id = 'oneTouchBroadbandOrderPageFive';

    const data = `  <div class="features">
                      <section class="features">
                      <div class="flex-container-40">
                        <div class="oneTouchFormContainer">
                          <div class="fontH3">Terms And Conditions</div>
                          <div class="dataSummaryContainer textSilver fontH2">
                            <div class="dataRowSummaryContainer justifyText">
                              <div class="rowDisplayStart">
                                <div>All FTTP Products are available on request.</div>
                                <div>All products exclude DIA at £2.</div>
                                <div>
                                  Bespoke pricing and leased lines are available from your
                                  account manager
                                </div>
                                <div>
                                  The standard chunk of Lorem Ipsum used since the 1500s
                                  is reproduced below for those interested. Sections
                                  1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum"
                                  by Cicero are also reproduced in their exact original
                                  form, accompanied by English versions from the 1914
                                  translation by H. Rackham.
                                </div>
                              </div>
                            </div>
                            <div class="termsAndConditionsBtn">
                              <agreeWithTermsAndConditions
                                class="Checkbox alignHorizontally"
                              >
                                <input
                                  id="checkbox"
                                  type="checkbox"
                                  class="Checkbox-input"
                                />
                                <label for="checkbox" class="Checkbox-label"
                                  >I agree to the Terms and Conditions</label
                                >
                              </agreeWithTermsAndConditions>
                              <oneTouchPlaceOrder
                                id="oneTouchPlaceOrder"
                                class="btnOneTouch btnDisable"
                                role="button"
                              >
                                Place Broadband Order
                              </oneTouchPlaceOrder>
                            </div>
                          </div>
                        </div>
                        <div class="navComponent">
                          <goPageBack
                            id="pageFour"
                            class="btnOneTouch btnBack"
                            role="button"
                          >
                            Go Back
                          </goPageBack>
                        </div>
                      </div>
                    </div>`;

    oneTouchTermsAndConditions.innerHTML = data;
    oneTouchBroadbandOrderPageFour.classList.add('hidden');
    oneTouchBroadbandContainer.appendChild(oneTouchTermsAndConditions);

    const endPoint = location.href.split('/').slice(-1)[0];
    persistDOMData(endPoint);
  } catch (err) {
    console.log(err);
  }
}

export { _termsAndConditions };
