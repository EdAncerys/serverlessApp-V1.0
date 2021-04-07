async function _oneTouchUserAuthentication() {
  console.log('User Authentication middleware');

  const URL = '/oneTouch/oneTouchUserAuthentication';
  const access_token = sessionStorage.getItem('access_token');

  const body = {
    access_token,
  };

  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    console.log(response);
    if (!response.ok) throw new Error(data);

    if (response.redirected) {
      sessionStorage.clear();
      window.location.replace(response.url);
    }
    return;
  } catch (err) {
    console.log(err);
    return;
  }
}

export { _oneTouchUserAuthentication };
