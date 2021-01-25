import { _warningMessage } from './_warningMessage.js';

const _handleErrors = (errors) => {
  console.log('Form validation error...');
  let msg = document.querySelector('msg');
  document.querySelector('#msg').style.display = 'block';
  let errorMsg = errors.map((err) => {
    return _warningMessage(err.msg);
  });

  msg.innerHTML = `<div>
                    <h4>${errorMsg}</h4>
                  </div>`;
  setTimeout(() => {
    document.querySelector('#msg').style.display = 'none';
  }, 3000);
};

export { _handleErrors };
