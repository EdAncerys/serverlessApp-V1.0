document.querySelector('body').addEventListener('click', (event) => {
  const oneTouchPortal = event.target.id === 'oneTouchPortal';

  // console.log(event.target);
  if (oneTouchPortal) {
    async function asyncDataRequest() {
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
        const data = await response.json();
        if (!response.ok) throw new Error(data.msg);

        window.location.replace('/views/oneTouch/index.html');
      } catch (err) {
        sessionStorage.clear();
        window.location.replace('/views/oneTouch/one-touch-login.html');
        return false;
      }
    }
    asyncDataRequest();
  }
});
