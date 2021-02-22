import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

async function _oneTouchUsers() {
  console.log('Fetching users from db...');
  _spinner(true);
  const URL = '/oneTouch/users';
  const oneTouchUsers = document.querySelector('oneTouchUsers');

  try {
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
                      <btnInfoUser id='${user._id}' value='${user._id}' class="btnB01" role="button">
                        Info
                      </btnInfoUser>
                      <btnUpdateUser id='${user._id}' value='${user._id}' class="btnB01" role="button">
                        Update
                      </btnUpdateUser>
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
    document.querySelector('body').addEventListener('click', (event) => {
      const btnInfoUser = event.target.nodeName === 'BTNINFOUSER';
      const btnUpdateUser = event.target.nodeName === 'BTNUPDATEUSER';
      const btnDeleteUser = event.target.nodeName === 'BTNDELETEUSER';

      let id = event.target.getAttribute('id');

      if (btnInfoUser) {
        console.log(id);
        _errorMessage(id, 'success');
      }
      if (btnUpdateUser) {
        console.log(id);
        _errorMessage(id, 'warning');
      }
      if (btnDeleteUser) {
        console.log(id);
        _errorMessage(id);
      }
    });
  } catch (err) {
    console.log(err);
    _errorMessage(err);
  }
}

export { _oneTouchUsers };
