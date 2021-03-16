import { persistDOMData } from '../../../persistDOMData.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _fetchOneTouchUsersFromDB(pageName) {
  console.log('Fetching users from db...');
  _spinner(true, 'Loading Active Users...');
  const URL = '/oneTouch/customer';

  let userData = '';
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
    // Removing user previous data
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

    data.map((user) => {
      if (pageName === 'manage-customers') {
        manageUsersNav = `<div class="manageUsersNav">
                          <userInfo id='${user._id}' email='${user.email}' class="btnB01" role="button">
                            Info
                          </userInfo>
                          <updateUser id='${user._id}' email='${user.email}' class="btnB01" role="button">
                            Update
                          </updateUser>
                            <deleteUser id='${user._id}' email='${user.email}' class="btnB01" role="button">
                            Delete
                          </deleteUser>
                        </div>`;
      }
      if (pageName === 'order-new-connection') {
        manageUsersNav = `<div class="manageUsersNavNC">
                          <userInfo id='${user._id}' email='${user.email}' class="btnB01" role="button">
                            Info
                          </userInfo>
                          <selectUser id='${user._id}' 
                                      fullName='${user.fullName}'
                                      email='${user.email}'
                                      sub_premises='${user.sub_premises}'
                                      premises_name='${user.premises_name}' 
                                      thoroughfare_number='${user.thoroughfare_number}' 
                                      thoroughfare_name='${user.thoroughfare_name}' 
                                      locality='${user.locality}'
                                      post_town='${user.post_town}'
                                      county='${user.county}' 
                                      postcode='${user.postcode}' 
                                      district_id='${user.district_id}' 
                                      nad_key='${user.nad_key}'  
                                      class="btnB01" 
                                      role="button">
                            Select
                          </selectUser>
                        </div>`;
      }

      userData += `<div class='boxContainer backgroundWhiteT01'>
                    <div class="manageUsersRow">
                      <div class="tableCell">${user.fullName}</div>
                      <div class="tableCell">${user.email}</div>
                    </div>
                    ${manageUsersNav}
                  </div>`;
    });

    if (data.length === 0) {
      oneTouchCustomer.innerHTML = `<div class='alignHorizontally'>
                                  <div class='userRowNAU'>
                                    <div>No Users Added To DB!</div>
                                    ${sliderNav}
                                  </div>
                                </div>`;
    } else {
      oneTouchCustomer.innerHTML = `<div class='alignHorizontally'>
                                  <div class='manageUserContainer'>
                                    <div class="manageUsersRow boxContainer backgroundWhiteT01">
                                      <div class="tableCell">Full Name</div>
                                      <div class="tableCell">Email</div>
                                    </div>
                                      ${userData}
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

export { _fetchOneTouchUsersFromDB };
