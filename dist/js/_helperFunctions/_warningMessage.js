const _warningMessage = (message) => {
  let msg = document.querySelector('msg');
  setTimeout(() => {
    msg.innerHTML = '';
  }, 3000);

  return `<div class='text-danger'>
          <h6>Error occurred...</h6>
          <h6>${message}</h6>
          </div>`;
};

export { _warningMessage };
