import { _errorMessage } from './helperFunctions/_errorMessage.js';
import { oneTouchUserAuthentication } from './oneTouchUserAuthentication.js';

document.addEventListener('DOMContentLoaded', () => {
  oneTouchUserAuthentication(); // User authentication

  document.getElementById('raiseTicket').addEventListener('click', raiseTicket);
});

const raiseTicket = (ev) => {
  ev.preventDefault();
  _errorMessage('Form Not active yet...', 'warning');
};
