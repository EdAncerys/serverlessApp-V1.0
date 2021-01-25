const _warningMessage = (message) => {
  let msg = document.querySelector('msg');
  setTimeout(() => {
    msg.innerHTML = '';
  }, 3000);

  return `<div class='text-danger'>
            <h4>Error occurred...</h4>
            <h4>${message}</h4>
          </div>`;
};

export { _warningMessage };
