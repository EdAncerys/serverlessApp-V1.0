import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

async function _oneTouchUsers() {
  console.log('Fetching all users...');
  _spinner(true);
  const URL = '/oneTouch/users';
  const oneTouchUsers = document.querySelector('oneTouchUsers');

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      _spinner(false);
      const tableCellStyle = `style="border: 1px solid #c1c1c1;
                              color: #2b2b2b;
                              font-size: 16px;
                              font-weight: normal;
                              padding: 20px;
                              text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);"`;

      let content = data.map((user) => {
        return `<tr style="padding: 5px">
                  <th ${tableCellStyle}>${user.name}</th>
                  <th ${tableCellStyle}>${user.username}</th>
                  <th ${tableCellStyle}>${user.phone}</th>
                  <th ${tableCellStyle}>${user.email}</th>
                  <th ${tableCellStyle}>
                  <btnDeleteUser id='${user._id}' value='${user._id}' class="btnOneTouch" role="button">
                    Delete
                  </btnDeleteUser>
                </th>
                </tr>`;
      });
      oneTouchUsers.innerHTML = `<div>
                                    <h2 style="display: grid; justify-content: center">All Registered Orders</h2>
                                    <div style="display: grid; justify-content: center; background">
                                      <table id='oneTouchOrderTable' style="background-color: #f4f4f4; min-width: 400px; margin: 20px">
                                        <tr>
                                          <th
                                          colspan="5"
                                          style="
                                            color: #f4f4f4;
                                            background: #f7f7f7;
                                            border: 1px solid #343a45;
                                            text-align: center;
                                            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
                                            vertical-align: middle;
                                            padding: 10px;
                                          "
                                          >
                                            <div style="display: grid; justify-content: center">
                                              <img src="../../../views/oneTouch/images/color_logo_transparent.png" alt="ndgLogo"/>
                                            </div>
                                          </th>
                                        </tr>
                                        <tr style="padding: 5px">
                                          <th ${tableCellStyle}>Name</th>
                                          <th ${tableCellStyle}>Username</th>
                                          <th ${tableCellStyle}>Phone</th>
                                          <th ${tableCellStyle}>Email</th>
                                          <th ${tableCellStyle}>Delete User</th>
                                        </tr>
                                          ${content}
                                      </table>
                                    </div>
                                  </div>`;

      document
        .getElementById('oneTouchOrderTable')
        .addEventListener('click', (event) => {
          const isButton = event.target.nodeName === 'BTNDELETEUSER';

          if (!isButton) {
            return;
          }

          // _deleteOneTouchOrder(event.target.id);
          console.log(event.target.id);
        });

      console.log(data);
    })
    .catch((err) => {
      _spinner(false);
      _errorMessage(err);
      console.log(err);
    });
}

export { _oneTouchUsers };
