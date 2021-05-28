import { persistDOMData } from '../../persistDOMData.js';
import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';
import { _freshDeskTicket } from './_freshDeskTicket.js';

async function _oneTouchCreateTicket() {
  console.log('Creating oneTouch Ticket');

  const URL = '/oneTouch/tickets/freshDeskCreateTicket';
  const access_token = await sessionStorage.getItem('access_token');

  const contactReason = document.getElementById('contactReason').value;
  const priority = document.getElementById('priority').value;
  const fullName = document.getElementById('fullName').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const subject = document.getElementById('subject').value;
  const description = document.getElementById('description').value;

  if (contactReason === 'contactReason') {
    _errorMessage('Please select contact reason', 'warning');
    return;
  }
  if (priority === 'priority') {
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
    description,
    subject,
    priority,
    contactReason,
    fullName,
    phoneNumber,
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

    clearFormData();
    _freshDeskTicket();
    const endPoint = location.href.split('/').slice(-1)[0];
    persistDOMData(endPoint);
    _spinner(false);
  } catch (err) {
    console.log(err);
    _spinner(false);
    _errorMessage(err);
  }
}

const clearFormData = () => {
  document.getElementById('contactReason').value = 'contactReason';
  document.getElementById('priority').value = 'priority';
  document.getElementById('fullName').value = '';
  document.getElementById('phoneNumber').value = '';
  document.getElementById('subject').value = '';
  document.getElementById('description').value = '';
};

export { _oneTouchCreateTicket };
