document.addEventListener('DOMContentLoaded', () => {
  fetchIPAddresses();
});

const fetchIPAddresses = () => {
  let dns = document.querySelector('dns');

  const URL = '/.netlify/functions/dns';
  const body = { URL: 'https://ndg-technology.netlify.app' };

  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  fetch(URL, config)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let content = data.IP.map((addressIP) => {
        return `<strong>IP: ${addressIP}</strong>`;
      });
      dns.innerHTML = `<h5 class="displayCenter text-info">Netlify IP list</h5>
                        <p class="displayCenter text-success">${content}</p>`;
    })
    .catch((err) => {
      console.log('error');
      console.log(err);
    });
};
