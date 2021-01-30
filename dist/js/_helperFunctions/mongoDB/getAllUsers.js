import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

function _getAllUsers() {
  console.log('Fetching all users...');
  _spinner(true);
  const URL = '/ndg/users';
  const users = document.querySelector('users');

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      _spinner(false);
      let content = data.map((user) => {
        return `<p>ID: ${user._id}</p>
                <p>Name: ${user.name}</p>
                <p>email: ${user.email}</p>`;
      });
      users.innerHTML = `<h4>All Registered Users</h4>
                        <div>${content}</div>`;

      console.log(data);
    })
    .catch((err) => {
      _errorMessage(err);
      console.log(err);
    });
}

export { _getAllUsers };
