import { _errorMessage } from './helperFunctions/_errorMessage.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('raiseTicket').addEventListener('click', raiseTicket);
});

const raiseTicket = async (ev) => {
  ev.preventDefault();
  await _errorMessage('Coming Soon...', 'warning');
};
