import { _errorMessage } from '../_errorMessage.js';
import { _spinner } from '../_spinner.js';

async function _deleteOneTouchOrder(id) {
  console.log('Deleting Broadband Order...');
  _spinner(true);

  const URL = 'oneTouch/orders';
  const body = {
    _id: id,
  };
  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  fetch(URL, config)
    .then((res) => res.json())
    .then((data) => {
      _spinner(false);
      _errorMessage(data.msg);

      console.log(data);
    })
    .catch((err) => {
      _spinner(false);
      _errorMessage(data.msg);

      console.log(err);
    });
}

export { _deleteOneTouchOrder };
