import { _oneTouchUsers } from '../JS/_helperFunctions/mongoDB/_oneTouchUsers.js';
import { _errorMessage } from './_helperFunctions/_errorMessage.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('getAllUsers').addEventListener('click', getAllUsers);
  document
    .getElementById('createOneTouchUser')
    .addEventListener('click', createOneTouchAccount);
});

if (performance.navigation.type == PerformanceNavigation.TYPE_RELOAD) {
  console.info('This page is reloaded');
  const oneTouchUsers = document.querySelector('oneTouchUsers');
  const domBody = sessionStorage.getItem('body');
  // document.body.innerHTML = domBody;
  // oneTouchUsers.innerHTML = domBody;
  // console.log(domBody);
}

const observer = new MutationObserver((list) => {
  const evt = new CustomEvent('dom-changed', { detail: list });
  document.body.dispatchEvent(evt);
});
observer.observe(document.body, {
  attributes: true,
  childList: true,
  subtree: true,
});

document.body.addEventListener('dom-changed', (e) => {
  console.info('Saving Data to sessionStorage...');
  const body = document.body.innerHTML;
  sessionStorage.setItem('body', body);
});

const persistUserData = () => {
  const body = document.querySelector('body');
  console.log(body);
};

const getAllUsers = (ev) => {
  ev.preventDefault();
  _oneTouchUsers();
};

const createOneTouchAccount = (ev) => {
  ev.preventDefault();
  _errorMessage('Form Not active yet...', 'warning');
};
