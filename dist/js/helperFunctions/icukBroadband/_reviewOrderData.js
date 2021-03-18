import { persistDOMData } from '../../persistDOMData.js';

async function _reviewOrderData(oneTouchOrderData) {
  console.table(oneTouchOrderData);

  try {
    // Removing user previous data
    const removeData = document.querySelector(
      '#oneTouchBroadbandOrderPageFour'
    );
    if (removeData) removeData.remove();

    const oneTouchSlider = document.querySelector('#oneTouchSlider');
    const oneTouchBroadbandOrderPageThree = document.querySelector(
      '#oneTouchBroadbandOrderPageThree'
    );
    const oneTouchOrderReview = document.createElement('div');
    oneTouchOrderReview.id = 'oneTouchBroadbandOrderPageFour';

    const oneTouchData = JSON.parse(sessionStorage.getItem('oneTouchData'));
    const mergedData = { ...oneTouchData, ...oneTouchOrderData };

    // Save data to session storage
    sessionStorage.setItem('oneTouchData', JSON.stringify(mergedData));

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

    const orderData = `<div class="boxContainer backgroundLG03 broadbandDataContainerHover fontH2">
                        <div class="broadbandDataContainer">
                          <div class="tableCell">${mergedData.name}</div>
                          <div class="tableCell">${mergedData.likely_down_speed}</div>
                          <div class="tableCell">${mergedData.likely_up_speed}</div>
                          <div class="tableCell">${mergedData.price}</div>
                          <div class="tableCell">${mergedData.installation}</div>
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
                                      <div class="headerMsgTitle colorWhite">
                                        <div class="fontH4">Review Your Order!</div>
                                        <div class="fontH2">Order details will be submitted as per bellow information</div>
                                      </div>
                                      <div class="boxContainer broadbandDataContainer backgroundWhite">
                                        <div class="tableCell">Supplier</div>
                                        <div class="tableCell">Download</div>
                                        <div class="tableCell">Upload</div>
                                        <div class="tableCell">Price</div>
                                        <div class="tableCell">Installation</div>
                                        <div class="tableCell">Order</div>
                                      </div>
                                      ${orderData}
                                      <div class="boxContainer backgroundLG03 broadbandDataContainerHover">
                                        <div class="broadbandOrderReviewContainer">
                                          <div class="fontH3">Full Address Provided:</div>
                                          <div class="fontH2">${sub_premises} ${premises_name}  ${thoroughfare_number} ${thoroughfare_name} ${locality} ${post_town} ${county} ${postcode}</div>
                                          <div class="fontH3">Customer Details:</div>
                                          <div class="fontH2 colorDanger">Full Name: ${mergedData.customerFullName} | Email: ${mergedData.customerEmail}</div>
                                        </div>
                                      </div>
                                      <div class='sliderNav'>
                                        <goBackBtn id='pageThree' class="btnOneTouch btnBack" role="button">
                                          Go Back
                                        </goBackBtn>
                                      </div>
                                    </div>`;

    oneTouchBroadbandOrderPageThree.classList.add('hidden');
    oneTouchSlider.appendChild(oneTouchOrderReview);
    persistDOMData('oneTouchBodyContainer', 'order-new-connection');
  } catch (err) {
    console.log(err);
  }
}

export { _reviewOrderData };
