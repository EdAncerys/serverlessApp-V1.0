async function _createOneTouchOrder(
  name,
  likely_down_speed,
  likely_up_speed,
  price,
  installation
) {
  console.log('Creating Broadband Order. Name: ' + name);

  const URL = '/oneTouch/orders';
  const body = {
    name,
    likely_down_speed,
    likely_up_speed,
    price,
    installation,
  };
  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  fetch(URL, config)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.msg);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export { _createOneTouchOrder };
