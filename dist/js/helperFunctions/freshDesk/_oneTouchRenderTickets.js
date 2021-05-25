import { persistDOMData } from '../../persistDOMData.js';
import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

async function _oneTouchRenderTickets(id) {
  console.log('Rendering User Tickets...');
  _spinner(true, 'Loading Tickets...');
  const freshDeskTickets = await JSON.parse(
    sessionStorage.getItem('oneTouchTickets')
  );

  const goBackBtn = `
                    <div class="features">
                      <div class="flex-container-100">
                        <div class="outer">
                          <inner class="inner">
                            <btnLabel>Back</btnLabel>
                          </inner>
                        </div>
                      </div>
                    </div>`;

  let ticketData = `${goBackBtn}`;

  freshDeskTickets.map((ticket) => {
    let ticketSubject = ticket.subject;
    if (ticketSubject) ticketSubject = 'Information Not Available';

    ticketData += `
                    <searchRowComponent>
                      <div class="rowContainer bgGradientSilver">
                        <div class="rowComponent-2">
                          <div class="cellComponent">
                            <search>${ticketSubject}</search>
                            <search class="bottomDataRow">${ticket.id}</search>
                          </div>
                          <div class="cellComponent">
                            <search>${ticket.created_at}</search>
                            <search class="bottomDataRow">${ticket.cc_emails}</search>
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
