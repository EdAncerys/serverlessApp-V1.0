import { persistDOMData } from '../../persistDOMData.js';
import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

async function _allFreshDeskTickets() {
  console.log('Fetching All User Tickets...');
  _spinner(true, 'Loading Tickets...');
  const URL = '/oneTouch/tickets/allFreshDeskTickets';
  const access_token = await sessionStorage.getItem('access_token');

  const body = {
    access_token,
  };
  console.log(body);
  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
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

export { _allFreshDeskTickets };
