import { persistDOMData } from '../../../persistDOMData.js';
import { _errorMessage } from '../../_errorMessage.js';
import { _spinner } from '../../_spinner.js';

async function _fetchOneTouchUsersFromDB() {
  console.log('Fetching users from db...');
  _spinner(true, 'Loading Active Users...');
  const URL = '/oneTouch/users';
  const oneTouchUsers = document.querySelector('oneTouchUsers');

  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);

    let userData = '';
    data.map((user) => {
      userData += `<div class='boxContainer'>
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

    oneTouchUsers.innerHTML = `<div class='umContainer'>
                              <div class="manageUsersRow boxContainer">
                                <div class="tableCell">Full Name</div>
                                <div class="tableCell">Email</div>
                              </div>
                              ${userData}
                            </div>`;

    _spinner(false);
    persistDOMData('oneTouchBodyContainer', 'manage-users');
  } catch (err) {
    console.log(err);
    _errorMessage(err);
  }
}

export { _fetchOneTouchUsersFromDB };
