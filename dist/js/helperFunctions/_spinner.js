const _spinner = (active, msg) => {
  const spinnerContainer = document.querySelector('spinnerContainer');

  let spinnerWrapper = document.createElement('spinnerWrapper');
  let errMsgContent = document.createElement('errMsgContent');
  let spinnerIconContainer = document.createElement('spinnerIconContainer');
  let spinner = document.createElement('spinner');
  let spinnerMsg = document.createElement('spinnerMsg');
  const newMsg = msg ? msg : 'Loading Selection...';

  if (active) {
    spinnerContainer.appendChild(spinnerWrapper);
    spinnerWrapper.appendChild(errMsgContent);
    errMsgContent.appendChild(spinnerIconContainer);
    spinnerIconContainer.appendChild(spinner);
    errMsgContent.appendChild(spinnerMsg);
    // spinner.classList.add('fa', 'fa-cog', 'fa-spin'); // Add spinner icon
    spinner.classList.add('fa-spin'); // Add oneTouch icon
    spinnerMsg.innerHTML = newMsg;
  }
  if (!active) {
    let spinnerDel = document.querySelector('spinnerWrapper');
    if (spinnerDel) spinnerDel.remove();
  }
};

export { _spinner };
