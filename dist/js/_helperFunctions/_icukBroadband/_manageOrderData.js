import { persistDOMData } from '../../persistDOMData.js';

async function _manageOrderData(
  name,
  provider,
  likely_down_speed,
  likely_up_speed,
  price,
  installation
) {
  console.table(
    name,
    provider,
    likely_down_speed,
    likely_up_speed,
    price,
    installation
  );

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

    // Save data to session storage
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('provider', provider);
    sessionStorage.setItem('likely_down_speed', likely_down_speed);
    sessionStorage.setItem('likely_up_speed', likely_up_speed);
    sessionStorage.setItem('price', price);
    sessionStorage.setItem('installation', installation);

    let sub_premises =
      sessionStorage.getItem('sub_premises') === 'null'
        ? ''
        : sessionStorage.getItem('sub_premises');
    let premises_name =
      sessionStorage.getItem('premises_name') === 'null'
        ? ''
        : sessionStorage.getItem('premises_name');
    let thoroughfare_number =
      sessionStorage.getItem('thoroughfare_number') === 'null'
        ? ''
        : sessionStorage.getItem('thoroughfare_number');
    let thoroughfare_name =
      sessionStorage.getItem('thoroughfare_name') === 'null'
        ? ''
        : sessionStorage.getItem('thoroughfare_name');
    let locality =
      sessionStorage.getItem('locality') === 'null'
        ? ''
        : sessionStorage.getItem('locality');
    let post_town =
      sessionStorage.getItem('post_town') === 'null'
        ? ''
        : sessionStorage.getItem('post_town');
    let county =
      sessionStorage.getItem('county') === 'null'
        ? ''
        : sessionStorage.getItem('county');
    let postcode =
      sessionStorage.getItem('postcode') === 'null'
        ? ''
        : sessionStorage.getItem('postcode');

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
                                      <div class="headerMsgTitle colorWhite">
                                        <div class="fontH4">Review Your Order!</div>
                                        <div class="fontH2">Order details will be submitted as per bellow information</div>
                                      </div>
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
                                      <div class="boxContainer backgroundWhiteT01 broadbandDataContainerHover">
                                        <div class="broadbandOrderReviewContainer">
                                          <div class="fontH3">Full Address Provided:</div>
                                          <div class="fontH2">${sub_premises} ${premises_name}  ${thoroughfare_number} ${thoroughfare_name} ${locality} ${post_town} ${county} ${postcode}</div>
                                          <div class="fontH3">Customer Details:</div>
                                          <div class="fontH2">Email: Full Name:</div>
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

export { _manageOrderData };
