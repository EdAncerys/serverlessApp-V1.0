async function _createOneTouchOrder(access_token, oneTouchData) {
  console.log('Creating Broadband Order. Name: ' + oneTouchData.name);

  const URL = '/oneTouch/orders/addOrder';
  const body = {
    access_token,
    oneTouchData,
  };
  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

export { _createOneTouchOrder };
