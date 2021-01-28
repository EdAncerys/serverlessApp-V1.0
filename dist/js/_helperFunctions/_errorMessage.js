const _errorMessage = (message, type) => {
  const closeErrorMsg = () => {
    let errorMessage = document.querySelector('#errorMessage');
    errorMessage.style.visibility = 'hidden';
  };

  setTimeout(() => {
    let errorMessage = document.querySelector('#errorMessage');
    errorMessage.style.visibility = 'hidden';
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
                    id='errorMessage'
                    style="
                      display: grid;
                      position: absolute;
                      grid-template-columns: 1% 15% 75% 4%;
                      align-items: center;
                      width: 80vw;
                      height: 60px;
                      color: #f7f7f7;
                      margin: 2vw 0 0 10vw;
                      border-radius: 10px;
                      background-color: ${msgColor};
                      opacity: 0.8;
                    "
                  >
                    <div style="border-radius: 10px 0 0 10px; height: 100%; background-color: #292b2c"></div>
                    <div style="padding-left: 10%"><strong>${msgType}</strong></div>
                    <div>${message}</div>
                    <div id='closeErrorMsg'
                          style="cursor: pointer; padding-left: 50%;"> &times; </div>
                  </div>`;

  setTimeout(() => {
    document.querySelector('#closeErrorMsg').onclick = closeErrorMsg;
  }, 100);

  return errorMsg;
};

export { _errorMessage };
