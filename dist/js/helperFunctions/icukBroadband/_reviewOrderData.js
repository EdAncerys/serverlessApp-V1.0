import { persistDOMData } from '../../persistDOMData.js';

async function _reviewOrderData(oneTouchOrderData) {
  console.table(oneTouchOrderData);

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

    const oneTouch = await JSON.parse(sessionStorage.getItem('oneTouch'));
    const mergedData = { ...oneTouch, ...oneTouchOrderData };

    // Save data to session storage
    sessionStorage.setItem('oneTouch', JSON.stringify(mergedData));

    const sub_premises =
      mergedData.sub_premises === 'null' ? '' : mergedData.sub_premises;
    const premises_name =
      mergedData.premises_name === 'null' ? '' : mergedData.premises_name;
    const thoroughfare_number =
      mergedData.thoroughfare_number === 'null'
        ? ''
        : mergedData.thoroughfare_number;
    const thoroughfare_name =
      mergedData.thoroughfare_name === 'null'
        ? ''
        : mergedData.thoroughfare_name;
    const locality = mergedData.locality === 'null' ? '' : mergedData.locality;
    const post_town =
      mergedData.post_town === 'null' ? '' : mergedData.post_town;
    const county = mergedData.county === 'null' ? '' : mergedData.county;
    const postcode = mergedData.postcode === 'null' ? '' : mergedData.postcode;

    let customerInfo = `<div class="fontH2">Customer details not available!</div>
                        <div class="fontH2 textDanger">*To place the order please add customer details first.</div>`;
    if (mergedData.customerFullName)
      customerInfo = `<div class="fontH2 textDanger">Full Name: ${mergedData.customerFullName} | Email: ${mergedData.customerEmail}</div>`;

    let placeOrderClassList = 'btnB01';
    if (!mergedData.customerFullName) placeOrderClassList = 'btnB01 btnDisable';

    const orderData = `<div class="boxContainer bgGradientSilver broadbandDataContainerHover fontH2">
                        <div class="broadbandDataContainer">
                          <div class="tableCell">${mergedData.name}</div>
                          <div class="tableCell">${mergedData.likely_down_speed}</div>
                          <div class="tableCell">${mergedData.likely_up_speed}</div>
                          <div class="tableCell">${mergedData.price}</div>
                          <div class="tableCell">${mergedData.installation}</div>
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
                                        <div class="boxContainer broadbandDataContainer bgWhite">
                                          <div class="tableCell">Supplier</div>
                                          <div class="tableCell">Download</div>
                                          <div class="tableCell">Upload</div>
                                          <div class="tableCell">Price</div>
                                          <div class="tableCell">Installation</div>
                                          <div class="tableCell">Order</div>
                                        </div>
                                        ${orderData}
                                        <div class="boxContainer bgGradientSilver broadbandDataContainerHover">
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
