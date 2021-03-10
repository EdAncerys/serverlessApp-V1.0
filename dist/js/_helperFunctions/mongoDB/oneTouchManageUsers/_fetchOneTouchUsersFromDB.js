import { persistDOMData } from '../../../persistDOMData.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _fetchOneTouchUsersFromDB(pageName) {
  console.log('Fetching users from db...');
  _spinner(true, 'Loading Active Users...');
  const URL = '/oneTouch/users';

  let userData = '';
  let sliderNav = '';
  let oneTouchUsers = '';
  let oneTouchSlider = '';
  let oneTouchBroadbandOrderPageOne = '';
  let manageUsersNav = '';

  // User management page
  if (pageName === 'manage-users')
    oneTouchUsers = document.querySelector('oneTouchUsers');

  // Broadband order page
  if (pageName === 'order-new-connection') {
    // Removing user previous data
    const removeData = document.querySelector('#oneTouchBroadbandOrderPageTwo');
    if (removeData) removeData.remove();

    oneTouchSlider = document.querySelector('#oneTouchSlider');
    oneTouchBroadbandOrderPageOne = document.querySelector(
      '#oneTouchBroadbandOrderPageOne'
    );
    oneTouchUsers = document.createElement('div');
    oneTouchUsers.id = 'oneTouchBroadbandOrderPageTwo';
  }
  // if (pageName === 'order-new-connection') {
  //   sliderNav = `<div class='sliderNav'>
  //                 <goBackBtn id='pageOne' class="btnOneTouch btnBack" role="button">
  //                   Go Back
  //                 </goBackBtn>
  //               </div>`;
  // }

  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);

    data.map((user) => {
      if (pageName === 'manage-users') {
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
                          <selectUser id='${user._id}' email='${user.email}' class="btnB01" role="button">
                            Select
                          </selectUser>
                        </div>`;

        sliderNav = `<div class='sliderNav'>
                        <goBackBtn id='pageOne' class="btnOneTouch btnBack" role="button">
                          Go Back
                        </goBackBtn>
                      </div>`;
      }

      userData += `<div class='boxContainer backgroundWhiteT01'>
                    <div class="manageUsersRow">
                      <div class="tableCell">${user.fullName}</div>
                      <div class="tableCell">${user.email}</div>
                    </div>
                    ${manageUsersNav}
                  </div>
                    ${sliderNav}`;
    });

    if (data.length === 0) {
      let sliderNav = '';
      if (pageName === 'order-new-connection')
        sliderNav = `<div class='sliderNavNUA alignHorizontally'>
                      <goBackBtn id='pageOne' class="btnOneTouch backgroundSecondary" role="button">
                        Go Back
                      </goBackBtn>
                      <addUser class="btnOneTouch" 
                                role="button"
                                onclick = "location.href='../../../../views/oneTouch/add-user.html'";>
                        Add User
                      </addUser>
                    </div>`;
      oneTouchUsers.innerHTML = `<div class='alignHorizontally'>
                                    <div class='userRowNAU'>
                                      <div>No Users Added To DB!</div>
                                      ${sliderNav}
                                    </div>
                                  </div>`;
    } else {
      oneTouchUsers.innerHTML = `<div class='alignHorizontally'>
                                  <div class='manageUserContainer'>
                                    <div class="manageUsersRow boxContainer backgroundWhiteT01">
                                      <div class="tableCell">Full Name</div>
                                      <div class="tableCell">Email</div>
                                    </div>
                                      ${userData}
                                    </div>
                                  </div>`;
    }

    _spinner(false);
    if (pageName === 'manage-users')
      persistDOMData('oneTouchBodyContainer', 'manage-users');
    if (pageName === 'order-new-connection') {
      oneTouchSlider.appendChild(oneTouchUsers);
      oneTouchBroadbandOrderPageOne.classList.add('hidden');
      persistDOMData('oneTouchBodyContainer', 'order-new-connection');
    }
  } catch (err) {
    console.log(err);
    _errorMessage(err);
  }
}

export { _fetchOneTouchUsersFromDB };
