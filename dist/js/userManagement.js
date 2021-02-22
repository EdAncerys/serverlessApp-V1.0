import { _oneTouchUsers } from '../JS/_helperFunctions/mongoDB/_oneTouchUsers.js';
import { _errorMessage } from './_helperFunctions/_errorMessage.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('getAllUsers').addEventListener('click', getAllUsers);
  document
    .getElementById('createOneTouchUser')
    .addEventListener('click', createOneTouchAccount);
});
// Persist user data on reload
if (performance.navigation.type == PerformanceNavigation.TYPE_RELOAD) {
  console.info('This page is reloaded');
  const oneTouchDOMBody = sessionStorage.getItem('oneTouchDOMBody');
  const body = document.querySelector('body');
  body.innerHTML = oneTouchDOMBody;
}
// Create custom event
const observer = new MutationObserver((list) => {
  const evt = new CustomEvent('dom-changed', { detail: list });
  document.body.dispatchEvent(evt);
});
// Listen to DOM changes
observer.observe(document.body, {
  attributes: true,
  childList: true,
  subtree: true,
});
// Save DOM changes to localStorage
document.body.addEventListener('dom-changed', (e) => {
  console.info('Saving Data to sessionStorage...');
  const oneTouchDOMBody = document.body.innerHTML;
  sessionStorage.setItem('oneTouchDOMBody', oneTouchDOMBody);
});

const getAllUsers = (ev) => {
  ev.preventDefault();
  _oneTouchUsers();
};

const createOneTouchAccount = (ev) => {
  ev.preventDefault();
  _errorMessage('Form Not active yet...', 'warning');
};
