import { persistDOMData } from '../../persistDOMData.js';
import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

async function _allFreshDeskTickets() {
  console.log('Fetching All User Tickets...');
  _spinner(true, 'Loading Tickets...');
  const URL = '/oneTouch/tickets/allFreshDeskTickets';
  const access_token = await sessionStorage.getItem('access_token');

  const contactReason = document.getElementById('contactReason').value;
  const priorityLevel = document.getElementById('priorityLevel').value;
  const fullName = document.getElementById('fullName').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const subject = document.getElementById('subject').value;
  const description = document.getElementById('description').value;

  const body = {
    access_token,
    contactReason,
    priorityLevel,
    fullName,
    phoneNumber,
    subject,
    description,
  };
  console.log(body);
  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    console.log(data);

    _spinner(false);
  } catch (err) {
    console.log(err);
    _spinner(false);
    _errorMessage(err);
  }
}

export { _allFreshDeskTickets };
