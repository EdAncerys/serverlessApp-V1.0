async function _oneTouchUserAuthentication(href) {
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
    if (!response.ok) throw new Error(response.statusText);
    if (response.redirected) {
      sessionStorage.clear();
      window.location.replace(response.url);
    }
    window.location.replace(`/views/oneTouch/${href}`);

    return;
  } catch (err) {
    console.log(err);

    return;
  }
}

export { _oneTouchUserAuthentication };
