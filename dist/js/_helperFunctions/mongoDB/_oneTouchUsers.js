import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

async function _oneTouchUsers() {
  console.log('Fetching all users...');
  _spinner(true);
  const URL = '/oneTouch/users';
  const users = document.querySelector('oneTouchUsers');

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      _spinner(false);
      let content = data.map((user) => {
        return `<p>ID: ${user._id}</p>
                <p>Name: ${user.name}</p>
                <p>username: ${user.username}</p>
                <p>phone: ${user.phone}</p>
                <p>email: ${user.email}</p>`;
      });
      users.innerHTML = `<h4>All Registered Users</h4>
                        <div>${content}</div>`;

      console.log(data);
    })
    .catch((err) => {
      _spinner(false);
      _errorMessage(err);
      console.log(err);
    });
}

export { _oneTouchUsers };
