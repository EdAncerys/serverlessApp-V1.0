async function _createOneTouchOrder(access_token, oneTouchData) {
  console.log('Creating Broadband Order. Name: ' + oneTouchData.name);

  const URL = '/oneTouch/orders';
  const body = {
    oneTouchData,
    access_token,
  };
  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

export { _createOneTouchOrder };
