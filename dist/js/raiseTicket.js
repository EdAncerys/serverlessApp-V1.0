import { _errorMessage } from './helperFunctions/_errorMessage.js';
import { oneTouchUserAuthentication } from './oneTouchUserAuthentication.js';

oneTouchUserAuthentication(); // User authentication

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('raiseTicket').addEventListener('click', raiseTicket);
});

const raiseTicket = (ev) => {
  ev.preventDefault();
  _errorMessage('Form Not active yet...', 'warning');
};
