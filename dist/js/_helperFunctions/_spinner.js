// const _spinner = (value) => {
//   const spinner = document.querySelector('#spinner');
//   if (value) {
//     console.log('Spinner on');
//     // spinner.style.display = 'block';
//   } else {
//     console.log('Spinner off');
//     // spinner.style.display = 'none';
//   }
// };

// export { _spinner };

const _spinner = (active, msg) => {
  let spinnerContainer = document.querySelector('spinnerContainer');
  let spinnerIcon = document.createElement('spinnerIcon');
  let spinnerIconContainer = document.createElement('spinnerContainer');
  let spinnerMsg = document.createElement('spinnerMsg');
  const newMsg = msg ? msg : 'Loading Selection...';
  console.log('Spinner function', newMsg);

  if (active) {
    spinnerContainer.appendChild(spinner);
    spinnerContainer.appendChild(spinnerMsg);
    spinner.classList.add('fa', 'fa-cog', 'fa-spin');
    spinnerMsg.innerHTML = newMsg;
  }
  if (!active) {
    let spinnerDel = document.querySelector('spinner');
    let spinnerMsgDel = document.querySelector('spinnerMsg');
    if (spinnerDel) spinnerDel.remove();
    if (spinnerMsgDel) spinnerMsgDel.remove();
  }
};

export { _spinner };
