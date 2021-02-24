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

  const errorMsg = `<div
                      style="
                        display: grid;
                        justify-items: center;
                      "
                    >
                      <div
                        style="
                          display: grid;
                          grid-template-columns: 10px 1fr 6fr 40px;
                          width: 80%;
                          color: #f7f7f7;
                          margin: 5px 0;
                          border-radius: 10px;
                          background-color: ${msgColor};
                          opacity: 0.8;
                        "
                      >
                        <div style="border-radius: 10px 0 0 10px; height: 60px; background-color: #dfdfdf"></div>
                        <div style="
                              display: grid;
                              align-content: center;
                              padding-left: 10px;
                              ">
                              <strong>${msgType}</strong>
                        </div>
                        <div style="
                        display: grid;
                        align-content: center;
                        overflow: auto;
                        ">
                          ${message}
                        </div>
                        <closeErrorMsg id='${msgID}'
                              style="
                              cursor: pointer;
                              display: grid;
                              justify-items: center;
                              align-content: center;
                              "
                              > &times; 
                        </closeErrorMsg>
                      </div>
                    </div>`;

  let newErrorMsg = document.createElement('div');
  newErrorMsg.id = `errorMessage_${msgID}`;
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
