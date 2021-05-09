import { persistDOMData } from '../../persistDOMData.js';

async function _reviewOrderData(oneTouchOrderNo) {
  const broadbandAvailability = await JSON.parse(
    sessionStorage.getItem('broadbandAvailability')
  );
  const oneTouchCustomerData = await JSON.parse(
    sessionStorage.getItem('oneTouchCustomer')
  );
  const oneTouchCustomer = oneTouchCustomerData.oneTouchCustomer;
  const oneTouchBroadband = await broadbandAvailability[oneTouchOrderNo];

  // Save data to session storage
  sessionStorage.setItem(
    'oneTouchBroadband',
    JSON.stringify(oneTouchBroadband)
  );

  try {
    // Removing user previous data
    const removeData = document.querySelector(
      '#oneTouchBroadbandOrderPageFour'
    );
    if (removeData) removeData.remove();

    const oneTouchBroadbandContainer = document.querySelector(
      '#oneTouchBroadbandContainer'
    );
    const oneTouchBroadbandOrderPageThree = document.querySelector(
      '#oneTouchBroadbandOrderPageThree'
    );
    const oneTouchOrderReview = document.createElement('div');
    oneTouchOrderReview.id = 'oneTouchBroadbandOrderPageFour';

    const sub_premises =
      oneTouchCustomer.sub_premises === 'null'
        ? ''
        : oneTouchCustomer.sub_premises;
    const premises_name =
      oneTouchCustomer.premises_name === 'null'
        ? ''
        : oneTouchCustomer.premises_name;
    const thoroughfare_number =
      oneTouchCustomer.thoroughfare_number === 'null'
        ? ''
        : oneTouchCustomer.thoroughfare_number;
    const thoroughfare_name =
      oneTouchCustomer.thoroughfare_name === 'null'
        ? ''
        : oneTouchCustomer.thoroughfare_name;
    const locality =
      oneTouchCustomer.locality === 'null' ? '' : oneTouchCustomer.locality;
    const post_town =
      oneTouchCustomer.post_town === 'null' ? '' : oneTouchCustomer.post_town;
    const county =
      oneTouchCustomer.county === 'null' ? '' : oneTouchCustomer.county;
    const postcode =
      oneTouchCustomer.postcode === 'null' ? '' : oneTouchCustomer.postcode;

    let customerInfo = `<div class="fontH2">Customer details not available!</div>
                        <div class="fontH2 textDanger">*To place the order please add customer details first.</div>`;
    if (oneTouchCustomer.customerFullName)
      customerInfo = `<div class="fontH2 textDanger">Full Name: ${oneTouchCustomer.customerFullName} | Email: ${oneTouchCustomer.customerEmail}</div>`;

    let placeOrderClassList = 'btnB01';
    if (!oneTouchCustomer.customerFullName)
      placeOrderClassList = 'btnB01 btnDisable';

    const orderData = `<div class="boxContainer bgGradientSilver  fontH2">
                        <div class="broadbandDataContainer-C6">
                          <div class="tableCell">${oneTouchBroadband.name}</div>
                          <div class="tableCell">${oneTouchBroadband.likely_down_speed}</div>
                          <div class="tableCell">${oneTouchBroadband.likely_up_speed}</div>
                          <div class="tableCell">${oneTouchBroadband.price}</div>
                          <div class="tableCell">${oneTouchBroadband.installation}</div>
                          <div class="tableCell">
                          <div class='center'>
                            <termsAndConditions class="${placeOrderClassList} bgPrimary" role="button">
                              Place Order
                            </termsAndConditions>
                          </div>
                        </div>
                        </div>
                      </div>`;

    oneTouchOrderReview.innerHTML = `<section class="features">
                                      <div class="flex-container-60">
                                        <div class="headerMsgTitle">
                                          <div class="fontH4">Review Your Order!</div>
                                          <div class="fontH2">Order details will be submitted as per bellow information</div>
                                        </div>
                                        <div class="boxContainer broadbandDataContainer-C6 bgWhite">
                                          <div class="tableCell">Supplier</div>
                                          <div class="tableCell">Download</div>
                                          <div class="tableCell">Upload</div>
                                          <div class="tableCell">Price</div>
                                          <div class="tableCell">Installation</div>
                                          <div class="tableCell">Order</div>
                                        </div>
                                        ${orderData}
                                        <div class="boxContainer bgGradientSilver ">
                                          <div class="broadbandOrderReviewContainer">
                                            <div class="fontH3">Full Address Provided:</div>
                                            <div class="fontH2 textDanger">${sub_premises} ${premises_name}  ${thoroughfare_number} ${thoroughfare_name} ${locality} ${post_town} ${county} ${postcode}</div>
                                            <div class="fontH3">Customer Details:</div>
                                            ${customerInfo}
                                          </div>
                                        </div>
                                        <div class='navComponent'>
                                          <goPageBack id='pageThree' class="btnOneTouch btnBack" role="button">
                                            Go Back
                                          </goPageBack>
                                        </div>
                                      </div>
                                    </section>`;

    oneTouchBroadbandOrderPageThree.classList.add('hidden');
    oneTouchBroadbandContainer.appendChild(oneTouchOrderReview);
    const endPoint = location.href.split('/').slice(-1)[0];
    persistDOMData(endPoint);
  } catch (err) {
    console.log(err);
  }
}

export { _reviewOrderData };
