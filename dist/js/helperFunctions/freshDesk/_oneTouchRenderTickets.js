import { persistDOMData } from '../../persistDOMData.js';
import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

async function _oneTouchRenderTickets(id) {
  console.log('Rendering User Tickets...');
  _spinner(true, 'Loading Tickets...');
  const freshDeskTickets = await JSON.parse(
    sessionStorage.getItem('oneTouchTickets')
  );
  let ticketData = '';
  freshDeskTickets.map((ticket) => {
    ticketData += `
                  <searchRowComponent>
                    <div class="rowContainer bgGradientSilver">
                      <div class="rowComponent-3">
                        <div class="cellComponent">
                          <search>${ticket.id}</search>
                          <search class="bottomDataRow">${ticket.reply_cc_emails}</search>
                        </div>
                        <div class="cellComponent">
                          <search>${ticket.thoroughfare_number}</search>
                          <search class="bottomDataRow">${ticket.postcode}</search>
                        </div>
                        
                      </div>
                    </div>
                  </searchRowComponent>`;
  });

  const oneTouchTickets = document.createElement('div');
  oneTouchTickets.id = 'oneTouchTickets';
  oneTouchTickets.innerHTML = ticketData;

  // Removing customer previous data
  const removeData = document.querySelector('#oneTouchTickets');
  if (removeData) removeData.remove();

  const oneTouchTicketContainer = document.querySelector(
    '#oneTouchTicketContainer'
  );
  const oneTouchFormContainer = document.querySelector(
    '#oneTouchFormContainer'
  );
  oneTouchFormContainer.classList.add('hidden');
  oneTouchTicketContainer.appendChild(oneTouchTickets);
  const endPoint = location.href.split('/').slice(-1)[0];
  persistDOMData(endPoint);
  _spinner(false);
}

export { _oneTouchRenderTickets };
