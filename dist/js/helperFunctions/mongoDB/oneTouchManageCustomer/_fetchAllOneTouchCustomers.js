import { persistDOMData } from '../../../persistDOMData.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _fetchAllOneTouchCustomers(pageName) {
  console.log('Fetching customers from db...');
  _spinner(true, 'Loading Active Users...');
  const URL = '/oneTouch/customer';
  const access_token = sessionStorage.getItem('access_token');

  const body = {
    access_token,
  };
  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  let customerData = '';
  let sliderNav = '';
  let oneTouchCustomer = '';
  let oneTouchSlider = '';
  let oneTouchBroadbandOrderPageOne = '';
  let customerNawRow = '';

  // Manage Customer page
  if (pageName === 'manage-customers')
    oneTouchCustomer = document.querySelector('oneTouchCustomer');

  // Broadband order page
  if (pageName === 'order-new-connection') {
    // Removing customer previous data
    const removeData = document.querySelector('#oneTouchBroadbandOrderPageTwo');
    if (removeData) removeData.remove();

    oneTouchSlider = document.querySelector('#oneTouchSlider');
    oneTouchBroadbandOrderPageOne = document.querySelector(
      '#oneTouchBroadbandOrderPageOne'
    );
    oneTouchCustomer = document.createElement('div');
    oneTouchCustomer.id = 'oneTouchBroadbandOrderPageTwo';
  }
  if (pageName === 'order-new-connection') {
    sliderNav = `<div class='navWrapper alignHorizontally'>
                  <goBackBtn id='pageOne' class="btnOneTouch backgroundSecondary" role="button">
                    Go Back
                  </goBackBtn>
                  <addUser class="btnOneTouch" 
                            role="button"
                            onclick = "location.href='../../../../views/oneTouch/add-customer.html'";>
                    Add User
                  </addUser>
                </div>`;
  }

  try {
    const response = await fetch(URL, config);
    const data = await response.json();
    if (!response.ok) throw new Error(data);

    console.log(data);

    data.map((customer) => {
      //Btn selection option
      if (pageName === 'manage-customers') {
        customerNawRow = `<div class="customerNawRow">
                          <customerInfo id='${customer._id}' class="btnB01" role="button">
                            Info
                          </customerInfo>
                          <deleteCustomer id='${customer._id}' class="btnB01" role="button">
                            Delete
                          </deleteCustomer>
                        </div>`;
      }
      //Btn selection option
      if (pageName === 'order-new-connection') {
        customerNawRow = `<div class="customerNawRow">
                          <customerInfo id='${customer._id}' class="btnB01" role="button">
                            Info
                          </customerInfo>
                          <selectCustomer id='${customer._id}'
                                      class="btnB01" 
                                      role="button">
                            Select
                          </selectCustomer>
                        </div>`;
      }

      customerData += `<div class="rowContainer backgroundLG03">
                        <div class="manageCustomerRow">
                          <div class="rowDataWrapper">
                            <div>${customer.customerFullName}</div>
                            <div class="bottomDataRow">${customer.customerCreated}</div>
                          </div>
                          <div class="rowDataWrapper">
                            <div>${customer.customerPhoneNumber}</div>
                            <div class="bottomDataRow">${customer.customerEmail}</div>
                          </div>
                          <div class="rowDataWrapper">
                            <div>${customer.thoroughfare_number} ${customer.thoroughfare_name}</div>
                            <div class="bottomDataRow">${customer.postcode}</div>
                          </div>
                          <div class="rowDataWrapper">
                            <div>${customerNawRow}</div>
                          </div>
                        </div>
                      </div>`;
    });

    if (data.length === 0) {
      oneTouchCustomer.innerHTML = `<div class='alignHorizontally'>
                                      <div class='customerRowNAU'>
                                        <div>You have no customers added</div>
                                        ${sliderNav}
                                      </div>
                                    </div>`;
    } else {
      oneTouchCustomer.innerHTML = `
                                  <div class='customerDataContainer'>
                                    <div class="manageCustomerRow boxContainer backgroundGray">
                                      <div class="rowDataWrapper">Customer</div>
                                      <div class="rowDataWrapper">Contact Details</div>
                                      <div class="rowDataWrapper">Address</div>
                                      <div class="rowDataWrapper">Selection</div>
                                    </div>
                                      ${customerData}
                                      ${sliderNav}
                                  </div>`;
    }

    _spinner(false);
    if (pageName === 'manage-customers')
      persistDOMData('oneTouchBodyContainer', 'manage-customers');
    if (pageName === 'order-new-connection') {
      oneTouchSlider.appendChild(oneTouchCustomer);
      oneTouchBroadbandOrderPageOne.classList.add('hidden');
      persistDOMData('oneTouchBodyContainer', 'order-new-connection');
    }
  } catch (err) {
    console.log(err);
    _spinner(false);
    _errorMessage(err);
  }
}

export { _fetchAllOneTouchCustomers };
