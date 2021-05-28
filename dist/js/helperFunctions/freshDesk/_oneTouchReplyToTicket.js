import { persistDOMData } from '../../persistDOMData.js';
import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';
import { _oneTouchTicket } from './_oneTouchTicket.js';

async function _oneTouchReplyToTicket(id) {
  console.log('Replying to oneTouch Ticket');

  const URL = '/oneTouch/tickets/freshDeskReplyToTicket';
  const access_token = await sessionStorage.getItem('access_token');

  const descriptionResponse = document.getElementById('descriptionResponse').value;

  if (descriptionResponse === '') {
    _errorMessage('Please fill in all required fields', 'warning');
    return;
  }

  const body = {
    access_token,
    descriptionResponse,
    id,
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
    _oneTouchTicket();
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
  document.getElementById('descriptionResponse').value = '';
};

export { _oneTouchReplyToTicket };
