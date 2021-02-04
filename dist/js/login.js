document.addEventListener('DOMContentLoaded', () => {
  const oneTouchUserLogin = document.querySelector('#oneTouchUserLogin');
  oneTouchUserLogin.addEventListener('click', oneTouchUserLogin);
});

const oneTouchUserLogin = (e) => {
  e.preventDefault();
  console.log('login page script');
};
