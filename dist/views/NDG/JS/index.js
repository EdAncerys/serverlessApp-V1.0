document.querySelector('body').addEventListener('click', (event) => {
  const oneTouchPortal = event.target.id === 'oneTouchPortal';

  // console.log(event.target);
  if (oneTouchPortal) {
    console.log('portal');
    // window.location.replace('/views/oneTouch/one-touch-login.html');
    return;
  }
});

// href="./views/oneTouch/index.html"
