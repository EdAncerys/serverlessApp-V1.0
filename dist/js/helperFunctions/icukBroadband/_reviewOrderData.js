import { persistDOMData } from '../../persistDOMData.js';

async function _reviewOrderData(oneTouchOrderNo) {
  const availableBroadbandDeals = await JSON.parse(
    sessionStorage.getItem('availableBroadbandDeals')
  );
  const oneTouchBroadband = availableBroadbandDeals[oneTouchOrderNo];
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
      oneTouchBroadband.sub_premises === 'null'
        ? ''
        : oneTouchBroadband.sub_premises;
    const premises_name =
      oneTouchBroadband.premises_name === 'null'
        ? ''
        : oneTouchBroadband.premises_name;
    const thoroughfare_number =
      oneTouchBroadband.thoroughfare_number === 'null'
        ? ''
        : oneTouchBroadband.thoroughfare_number;
    const thoroughfare_name =
      oneTouchBroadband.thoroughfare_name === 'null'
        ? ''
        : oneTouchBroadband.thoroughfare_name;
    const locality =
      oneTouchBroadband.locality === 'null' ? '' : oneTouchBroadband.locality;
    const post_town =
      oneTouchBroadband.post_town === 'null' ? '' : oneTouchBroadband.post_town;
    const county =
      oneTouchBroadband.county === 'null' ? '' : oneTouchBroadband.county;
    const postcode =
      oneTouchBroadband.postcode === 'null' ? '' : oneTouchBroadband.postcode;

    let customerInfo = `<div class="fontH2">Customer details not available!</div>
                        <div class="fontH2 textDanger">*To place the order please add customer details first.</div>`;
    if (oneTouchBroadband.customerFullName)
      customerInfo = `<div class="fontH2 textDanger">Full Name: ${oneTouchBroadband.customerFullName} | Email: ${oneTouchBroadband.customerEmail}</div>`;

    let placeOrderClassList = 'btnB01';
    if (!oneTouchBroadband.customerFullName)
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
                            <termsAndConditions class="${placeOrderClassList}" role="button">
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
                                            <div class="fontH2">${sub_premises} ${premises_name}  ${thoroughfare_number} ${thoroughfare_name} ${locality} ${post_town} ${county} ${postcode}</div>
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
