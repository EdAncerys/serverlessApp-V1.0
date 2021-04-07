import { _handleFormValidation } from './helperFunctions/_handleFormValidation.js';
import { _freshDeskTickets } from './helperFunctions/freshDesk/_freshDeskTickets.js';

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('freshDeskTickets')
    .addEventListener('click', getFreshDeskTicket);
  document
    .getElementById('submitTicket')
    .addEventListener('click', submitFreshDeskTicket);
});

const submitFreshDeskTicket = async (ev) => {
  ev.preventDefault();
  await _handleFormValidation('_submitTicket');
};

const getFreshDeskTicket = async (ev) => {
  ev.preventDefault();
  await _freshDeskTickets();
};
