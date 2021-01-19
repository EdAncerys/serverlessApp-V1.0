const _successMessage = (name, message) => {
  return `<div class='text-info'>
          <h6>Thank You <span class='text-danger'>${name}</span></h6>
          <h6>${message}</h6>
          </div>`;
};

export { _successMessage };
