async function _oneTouchUserAuthentication() {
  console.log('User Authentication middleware');

  const URL = '/oneTouch/oneTouchUserAuthentication';
  const access_token = sessionStorage.getItem('access_token');

  const body = {
    access_token,
  };
  console.log(body);

  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    const data = await response.json();
    if (!response.ok) throw new Error(data.msg);
    console.log('Logged in successfully. Welcome to One Touch Portal.');
    // await sessionStorage.setItem('authMsg', data.msg);
    // window.location.href = '/views/oneTouch/index.html';
  } catch (err) {
    console.log('Access not authorized.');
    // await sessionStorage.setItem('authMsg', err);
    // window.location.href = '/views/oneTouch/one-touch-login.html';
  }
}

export { _oneTouchUserAuthentication };
