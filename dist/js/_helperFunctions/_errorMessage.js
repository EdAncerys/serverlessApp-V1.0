const _errorMessage = (message) => {
  let msg = document.querySelector('msg');
  setTimeout(() => {
    msg.innerHTML = '';
  }, 3000);

  return `<div class="alert error">
            <input type="checkbox" id="alert1"/>
            <label class="close" title="close" for="alert1">
              <i class="icon-remove"></i>
            </label>
            <p class="inner">
              <strong>Warning!</strong>${message}
            </p>
          </div>`;
};

export { _errorMessage };
