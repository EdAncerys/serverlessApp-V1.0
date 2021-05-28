import { persistDOMData } from '../../persistDOMData.js';
import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

async function _oneTouchTicket(data) {
  let freshDeskTicket = data.data;
  let conversation_data = data.conversation_data;
  let conversation = ``;

  console.log('Rendering User Ticket ID: ' + freshDeskTicket.id);
  _spinner(true, 'Loading Tickets...');

  conversation_data.map((ticketResponse) => {
    conversation += `
                    <div class="oneTouchFormContainer dataSummaryContainer bgGradientSilver textSilver fontH2">
                      ${ticketResponse.body}
                    </div>`;
  });

  const goBackBtn = `
                    <div class="features-no-margin">
                      <div class="flex-container-100">
                        <div class="outer">
                          <innerNo2 class="inner">
                            <btnLabelNo2>Back</btnLabelNo2>
                          </innerNo2>
                        </div>
                      </div>
                    </div>`;

  const descriptionResponse = `
                        <div class="oneTouchFormContainer dataSummaryContainer textSilver fontH2">
                          <form>
                            <label for="descriptionResponse">Reply To Ticket</label>
                            <textarea
                              type="text"
                              name="descriptionResponse"
                              id="descriptionResponse"
                              placeholder="Describe the issue..."
                              style="height: 100px"
                            ></textarea>
                          </form>
                          <descriptionResponse id='${freshDeskTicket.id}' class="btnOneTouch" role="button">
                            Replay
                          </descriptionResponse>
                        </div>`;

  let ticketDataContainer = `
                        <div class="oneTouchFormContainer">
                          ${goBackBtn}
                          <div class="headerText">
                            <div class="fontH4">${freshDeskTicket.subject}</div>
                          </div>
                        
                            <div class="dataContainerWrapper textSilver">
                              <div class="oneTouchFormContainer dataSummaryContainer bgGradientSilver textSilver fontH2">
                                ${freshDeskTicket.description}
                              </div>
                              ${conversation}
                              ${descriptionResponse}
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
