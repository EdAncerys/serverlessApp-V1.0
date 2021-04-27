async function _createOneTouchOrder(access_token, oneTouch) {
  console.log('Creating Broadband Order. Name: ' + oneTouch.name);

  const URL = '/oneTouch/orders/addOrder';
  const body = {
    access_token,
    oneTouchCustomer,
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
    return { ok: true };
  } catch (err) {
    console.log(err);
    return { ok: false };
  }
}

export { _createOneTouchOrder };
