import { persistDOMData } from '../../persistDOMData.js';
import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';
import { _oneTouchTicket } from './_oneTouchTicket.js';

async function _freshDeskTicket(id) {
  console.log('Fetching All User Tickets...');
  _spinner(true, 'Loading Tickets...');
  const URL = '/oneTouch/tickets/freshDeskTicket';
  const access_token = await sessionStorage.getItem('access_token');

  const body = {
    access_token,
    id,
  };
  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    const oneTouchTickets = data.data;
    console.log(data);

    let totalTickets = 0;
    let openTickets = 0;
    let pendingTickets = 0;
    let closedTickets = 0;

    if (oneTouchTickets) totalTickets = oneTouchTickets.length;
    if (oneTouchTickets)
      oneTouchTickets.map((ticket) => {
        let status = ticket.status;
        if (status === 2) openTickets += 1;
        if (status === 3) pendingTickets += 1;
        if (status === 4 || status === 5) closedTickets += 1;
      });

    if (!oneTouchTickets) {
      totalTickets = `Information Not Awaitable`;
      openTickets = `Information Not Awaitable`;
      pendingTickets = `Information Not Awaitable`;
      closedTickets = `Information Not Awaitable`;
    }

    let ticketOverview = `
                          <div class="oneTouchFormContainer bgGradientSilver">
                            <div class="alignHorizontally fontH3">
                              Open Tickets Overview
                            </div>
                            <div class="fontH2">
                              Manage and overview tickets - anytime, anywhere
                            </div>
                            <div class="dataSummaryContainer textSilver fontH2">
                              <div class="dataRowSummaryContainer justifyText allTickets">
                                <div class="rowDisplayStart allTickets">Total Tickets</div>
                                <div class="rowDisplayEnd allTickets">${totalTickets}</div>
                              </div>
                              <div id="pendingTickets" class="dataRowSummaryContainer justifyText bgSTOP">
                                <div class="rowDisplayStart">Open Tickets</div>
                                <div class="rowDisplayEnd">${openTickets}</div>
                              </div>
                              <div id="resolvedTickets" class="dataRowSummaryContainer justifyText bgSET">
                                <div class="rowDisplayStart">Pending Tickets</div>
                                <div class="rowDisplayEnd">${pendingTickets}</div>
                              </div>
                              <div id="resolvedTickets" class="dataRowSummaryContainer justifyText bgGO">
                                <div class="rowDisplayStart">Closed Tickets</div>
                                <div class="rowDisplayEnd">${closedTickets}</div>
                              </div>
                            </div>
                          </div>`;

    const oneTouchTicketOverview = document.querySelector(
      '#oneTouchTicketOverview'
    );
    if (!id) {
      oneTouchTicketOverview.innerHTML = ticketOverview;
      sessionStorage.setItem(
        'oneTouchTickets',
        JSON.stringify(oneTouchTickets)
      );
    }
    if (id) _oneTouchTicket(data);
    const endPoint = location.href.split('/').slice(-1)[0];
    persistDOMData(endPoint);
    _spinner(false);
  } catch (err) {
    console.log(err);
    _spinner(false);
    _errorMessage(err);
  }
}

export { _freshDeskTicket };
