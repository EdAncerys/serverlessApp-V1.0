import { persistDOMData } from '../../../persistDOMData.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _fetchOneTouchCustomerFromDB(pageName) {
  console.log('Fetching customers from db...');
  _spinner(true, 'Loading Active Users...');
  const URL = '/oneTouch/customer';

  let customerData = '';
  let sliderNav = '';
  let oneTouchCustomer = '';
  let oneTouchSlider = '';
  let oneTouchBroadbandOrderPageOne = '';
  let manageUsersNav = '';

  // User management page
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
    sliderNav = `<div class='sliderNavNUA alignHorizontally'>
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
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);

    data.map((customer) => {
      const oneTouchCustomerData = JSON.stringify(customer);

      if (pageName === 'manage-customers') {
        manageUsersNav = `<div class="manageUsersNav">
                          <customerInfo id='${customer._id}' customerEmail='${customer.customerEmail}' class="btnB01" role="button">
                            Info
                          </customerInfo>
                          <updateCustomer id='${customer._id}' customerEmail='${customer.customerEmail}' class="btnB01" role="button">
                            Update
                          </updateCustomer>
                            <deleteCustomer id='${customer._id}' customerEmail='${customer.customerEmail}' class="btnB01" role="button">
                            Delete
                          </deleteCustomer>
                        </div>`;
      }
      if (pageName === 'order-new-connection') {
        manageUsersNav = `<div class="manageUsersNavNC">
                          <customerInfo id='${customer._id}' oneTouchCustomerData='${oneTouchCustomerData}' class="btnB01" role="button">
                            Info
                          </customerInfo>
                          <selectCustomer id='${customer._id}'
                                      oneTouchCustomerData='${oneTouchCustomerData}'
                                      class="btnB01" 
                                      role="button">
                            Select
                          </selectCustomer>
                        </div>`;
      }

      customerData += `<div class='rowContainer backgroundLG03'>
                    <div class="manageUsersRow">
                      <div class="tableCell">${customer.customerFullName}</div>
                      <div class="tableCell">${customer.customerEmail}</div>
                    </div>
                    ${manageUsersNav}
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
      oneTouchCustomer.innerHTML = `<div class='alignHorizontally'>
                                  <div class='manageUserContainer'>
                                    <div class="manageUsersRow boxContainer backgroundLG03">
                                      <div class="tableCell">Full Name</div>
                                      <div class="tableCell">Email</div>
                                    </div>
                                      ${customerData}
                                    </div>
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

export { _fetchOneTouchCustomerFromDB };
