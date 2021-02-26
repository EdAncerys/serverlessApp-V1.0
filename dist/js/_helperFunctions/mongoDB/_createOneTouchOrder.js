async function _createOneTouchOrder(
  broadband_name,
  broadband_provider,
  broadband_likely_down_speed,
  broadband_likely_up_speed,
  broadband_price,
  broadband_installation
) {
  console.log('Creating Broadband Order. Name: ' + broadband_name);

  const URL = '/oneTouch/orders';
  const body = {
    broadband_name,
    broadband_provider,
    broadband_likely_down_speed,
    broadband_likely_up_speed,
    broadband_price,
    broadband_installation,
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
