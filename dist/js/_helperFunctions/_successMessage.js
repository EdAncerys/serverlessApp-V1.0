const _successMessage = (name, message) => {
  let msg = document.querySelector('msg');
  setTimeout(() => {
    msg.innerHTML = '';
  }, 3000);

  return `<div class='text-info'>
          <h6>Thank You <span class='text-danger'>${name}</span></h6>
          <h6>${message}</h6>
          </div>`;
};

export { _successMessage };
