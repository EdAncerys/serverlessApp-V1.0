import { _deleteOneTouchUser } from '../mongoDB/_deleteOneTouchUser.js';
import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

async function _oneTouchUsers() {
  console.log('Fetching users from db...');
  _spinner(true);
  const URL = '/oneTouch/users';
  const oneTouchUsers = document.querySelector('oneTouchUsers');

  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);

  let userData = '';
  data.map((user) => {
    userData += `<div class='boxContainer'>
                    <div class="userDataContainer">
                      <div class="tableCell">${user.name}</div>
                      <div class="tableCell">${user.email}</div>
                    </div>
                    <div class="manageUserDataComponent">
                      <btnDeleteUser id='${user._id}' value='${user._id}' class="btnB01" role="button">
                        More
                      </btnDeleteUser>
                      <btnDeleteUser id='${user._id}' value='${user._id}' class="btnB01" role="button">
                        Update
                      </btnDeleteUser>
                        <btnDeleteUser id='${user._id}' value='${user._id}' class="btnB01" role="button">
                        Delete
                      </btnDeleteUser>
                    </div>
                  </div>`;
  });

  oneTouchUsers.innerHTML = `<div class='umContainer'>
                              <div class="userDataContainer boxContainer">
                                <div class="tableCell">Name</div>
                                <div class="tableCell">Email</div>
                              </div>
                              ${userData}
                            </div>`;

  _spinner(false);
}

export { _oneTouchUsers };
