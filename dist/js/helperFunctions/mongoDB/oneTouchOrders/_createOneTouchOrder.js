async function _createOneTouchOrder(access_token, oneTouch) {
  console.log('Creating Broadband Order. Name: ' + oneTouch.name);

  const URL = '/oneTouch/orders/addOrder';
  const body = {
    access_token,
    oneTouch,
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
