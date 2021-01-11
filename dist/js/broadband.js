document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('getDistrictID')
    .addEventListener('click', getDistrictID);

  let main = document.querySelector('main');
  main.innerHTML = `<h4>hello</h4>`;
});

function getDistrictID(ev) {
  ev.preventDefault();
  console.log('Fetching getDistrictIDs...');

  const postCode = document.getElementById('postCode').value;
  const URL = '/ndg/districtID/' + postCode;

  console.log(URL);

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      const msg = document.querySelector('#message');
      const main = document.querySelector('main');
      msg.style.display = 'block';

      let content = data.addresses.map((districtID) => {
        return `<li>Address ${districtID.address}</li>`;
      });
      main.innerHTML = `<ul>${content}</ul>`;
      // Resets form
      // handleEmailSubmit();

      console.log(data.addresses);
      console.log('Done...');
    })
    .catch((err) => {
      let main = document.querySelector('main');
      main.innerHTML = `<h4>${err}</h4>`;
      console.log(err);
    });
}
