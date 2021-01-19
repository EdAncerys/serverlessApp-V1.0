const _handleErrors = (errors) => {
  console.log('Form validation error...');
  let msg = document.querySelector('msg');
  document.querySelector('#msg').style.display = 'block';
  let errorMsg = errors.map((err) => {
    return `<h4 class='text-danger'>${err.msg}</h4>`;
  });
  msg.innerHTML = `<div>${errorMsg}</div>`;
  setTimeout(() => {
    document.querySelector('#msg').style.display = 'none';
  }, 3000);
};

export { _handleErrors };
