import { persistDOMData } from '../../persistDOMData.js';
import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

async function _oneTouchCreateTicket() {
  console.log('Creating oneTouch Ticket');

  const URL = '/oneTouch/tickets/freshDeskCreateTicket';
  const access_token = await sessionStorage.getItem('access_token');

  const contactReason = document.getElementById('contactReason').value;
  const priorityLevel = document.getElementById('priorityLevel').value;
  const fullName = document.getElementById('fullName').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const subject = document.getElementById('subject').value;
  const description = document.getElementById('description').value;

  if (contactReason === 'contactReason') {
    _errorMessage('Please select contact reason', 'warning');
    return;
  }
  if (priorityLevel === 'priorityLevel') {
    _errorMessage('Please select priority level', 'warning');
    return;
  }
  if (
    fullName === '' ||
    phoneNumber === '' ||
    subject === '' ||
    description === ''
  ) {
    _errorMessage('Please fill in all required fields', 'warning');
    return;
  }

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
    console.log(response);
    const data = await response.json();
    if (!response.ok) throw new Error(data.msg);
    console.log(data);

    _spinner(false);
  } catch (err) {
    console.log(err);
    _spinner(false);
    _errorMessage(err);
  }
}

export { _oneTouchCreateTicket };
