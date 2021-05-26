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
                    <div class="features-no-margin">
                      <div class="flex-container-100">
                        <div class="outer">
                          <inner class="inner">
                            <btnLabel>Back</btnLabel>
                          </inner>
                        </div>
                      </div>
                    </div>`;

  let ticketData = ``;
  let ticketDataContainer = ``;

  freshDeskTickets.map((ticket) => {
    let ticketSubject = ticket.subject;
    if (!ticketSubject) ticketSubject = 'Information Not Available';

    ticketData += `
                    <searchRowComponent id="${ticket.id}" >
                      <div class="ticketSummaryContainer textSilver fontH2">
                        <div class="dataRowSummaryContainer justifyText">
                          <search class="rowDisplayStart">${ticketSubject}</search>
                          <search class="rowDisplayEnd">${ticket.created_at}</search>
                        </div>
                      </div>
                    </searchRowComponent>`;
  });

  ticketDataContainer = `
                        <div class="oneTouchFormContainer">
                          ${goBackBtn}
                          <div class="headerText">
                            <div class="alignHorizontally fontH4">Manage All Raised Tickets</div>
                            <div class="alignHorizontally textSilver fontH2">
                              Manage all raised tickets in one place with a touch of a finger!
                            </div>
                          </div>
                          <div id='dataWrapper' class='dataWrapper'>
                            <div class="headerComponent">
                              <div class="ticketRowComponent-2 boxContainer bgGray">
                                <div class="cellComponent">Subject</div>
                                <div class="cellComponent">Ticket Created</div>
                              </div>
                            </div>
                            <div class='searchBox'>
                              <input
                                type="text"
                                id="searchBox"
                                placeholder="Search for Ticket..."
                              />
                            </div>
                            <div class="dataContainerWrapper">
                              ${ticketData}
                            </div>
                          </div>
                        </div>`;

  const oneTouchTickets = document.createElement('div');
  oneTouchTickets.id = 'oneTouchTickets';
  oneTouchTickets.innerHTML = ticketDataContainer;

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
