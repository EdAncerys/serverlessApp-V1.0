import { authenticateUser } from './authenticateUser.js';
import { _errorMessage } from './helperFunctions/_errorMessage.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('raiseTicket').addEventListener('click', raiseTicket);
});

const raiseTicket = async (ev) => {
  ev.preventDefault();
  await authenticateUser();

  _errorMessage('Coming Soon...', 'warning');
};
