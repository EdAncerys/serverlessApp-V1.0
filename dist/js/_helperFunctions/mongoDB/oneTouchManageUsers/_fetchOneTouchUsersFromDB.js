import { persistDOMData } from '../../../persistDOMData.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _fetchOneTouchUsersFromDB(pageName) {
  console.log('Fetching users from db...');
  _spinner(true, 'Loading Active Users...');
  const URL = '/oneTouch/users';

  let oneTouchUsers = '';
  let oneTouchSlider = '';
  let oneTouchBroadbandOrderPageOne = '';

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

  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);

    let userData = '';
    data.map((user) => {
      userData += `<div class='boxContainer backgroundWhiteT01'>
                    <div class="manageUsersRow">
                      <div class="tableCell">${user.fullName}</div>
                      <div class="tableCell">${user.email}</div>
                    </div>
                    <div class="manageUsersBtnRow">
                      <btnInfoUser id='${user._id}' email='${user.email}' class="btnB01" role="button">
                        Info
                      </btnInfoUser>
                      <btnUpdateUser id='${user._id}' email='${user.email}' class="btnB01" role="button">
                        Update
                      </btnUpdateUser>
                        <btnDeleteUser id='${user._id}' email='${user.email}' class="btnB01" role="button">
                        Delete
                      </btnDeleteUser>
                    </div>
                  </div>`;
    });

    oneTouchUsers.innerHTML = `<div class='alignHorizontally'>
                                <div class='umContainer'>
                                  <div class="manageUsersRow boxContainer backgroundWhiteT01">
                                    <div class="tableCell">Full Name</div>
                                    <div class="tableCell">Email</div>
                                  </div>
                                    ${userData}
                                  </div>
                                </div>`;

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
