import { persistDOMData } from '../../persistDOMData.js';
import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

async function _oneTouchTicket(data) {
  let freshDeskTicket = data.data;
  console.log(freshDeskTicket);
  console.log('Rendering User Ticket ID: ' + freshDeskTicket.id);
  _spinner(true, 'Loading Tickets...');

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

  let ticketDataContainer = `
                        <div class="oneTouchFormContainer">
                          ${goBackBtn}
                          <div class="headerText">
                            <div class="fontH4">${freshDeskTicket.subject}</div>
                          </div>
                        
                            <div class="dataContainerWrapper textSilver fontH2">
                              ${freshDeskTicket.description}
                            </div>
                          </div>
                        </div>`;

  const oneTouchTicket = document.createElement('div');
  oneTouchTicket.id = 'oneTouchTicket';
  oneTouchTicket.innerHTML = ticketDataContainer;

  // Removing customer previous data
  const removeData = document.querySelector('#oneTouchTicket');
  if (removeData) removeData.remove();

  const oneTouchTicketContainer = document.querySelector(
    '#oneTouchTicketContainer'
  );
  const oneTouchTickets = document.querySelector('#oneTouchTickets');

  oneTouchTickets.classList.add('hidden');
  oneTouchTicketContainer.appendChild(oneTouchTicket);

  const endPoint = location.href.split('/').slice(-1)[0];
  persistDOMData(endPoint);
  _spinner(false);
}

export { _oneTouchTicket };
