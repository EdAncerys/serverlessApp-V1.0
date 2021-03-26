const _errorMessage = (message, type) => {
  let errorMessageContainer = document.querySelector('errorMessage');
  let msgID = Date.now().toString();

  setTimeout(() => {
    let errMsg = document.getElementById(`errorMessage_${msgID}`);
    if (errMsg) errMsg.remove();
  }, 4000);

  let msgType;
  let msgColor;

  if (type === 'warning') {
    msgType = 'Warning!';
    msgColor = '#f0ad4e';
  } else if (type === 'success') {
    msgType = 'Success!';
    msgColor = '#5cb85c';
  } else {
    msgType = 'Error!';
    msgColor = '#d9534f';
  }

  const errorMsg = `<div class='errorMsgContainer'>
                      <div
                        id='errorMsgWrapper'
                        class='errorMsgWrapper'
                        style="background-color: ${msgColor};"
                      >
                        <div class='errorMsgLeftContainer'></div>
                        <div class='errorMsgType'>
                            <strong>${msgType}</strong>
                        </div>
                        <div class='errorMsg'>
                          ${message}
                        </div>
                        <closeErrorMsg id='${msgID}' class='errorIdContainer'> 
                          &times; 
                        </closeErrorMsg>
                      </div>
                    </div>`;

  const newErrorMsg = document.createElement('div');
  newErrorMsg.id = `errorMessage_${msgID}`;
  newErrorMsg.classList.add('errorMessage');
  newErrorMsg.innerHTML = errorMsg;
  errorMessageContainer.appendChild(newErrorMsg);

  document
    .getElementById(`errorMessage_${msgID}`)
    .addEventListener('click', (event) => {
      const closeErrorMsg = event.target.nodeName === 'CLOSEERRORMSG';

      let id = event.target.getAttribute('id');

      if (closeErrorMsg) {
        let errMsg = document.getElementById(`errorMessage_${msgID}`);
        if (errMsg) errMsg.remove();
      }
    });
};

export { _errorMessage };
