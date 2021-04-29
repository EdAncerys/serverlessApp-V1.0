async function _createOneTouchBroadband(
  access_token,
  oneTouchCustomer,
  oneTouchBroadband
) {
  console.log('Creating Broadband Order. Name: ' + oneTouchBroadband.name);

  const URL = '/oneTouch/orders/addOrder';
  const body = {
    access_token,
    oneTouchCustomer,
    oneTouchBroadband,
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
    return {
      statusCode: 201,
      ok: true,
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 201,
      ok: false,
    };
  }
}

export { _createOneTouchBroadband };
