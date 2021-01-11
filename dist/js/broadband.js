document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('getDistrictID')
    .addEventListener('click', getDistrictID);
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
      msg.style.display = 'block';
      const main = document.querySelector('main');

      let content = data.addresses.map((districtID) => {
        return `<option value="${districtID.address}">${districtID.address}</option>`;
      });
      main.innerHTML = `<label for="districtID">Choose a address:</label>
                        <select name="districtID" id="districtID">
                          ${content}
                        </select>`;

      console.log(data.addresses);
      console.log('Done...');
    })
    .catch((err) => {
      let main = document.querySelector('main');
      main.innerHTML = `<h4>${err}</h4>`;
      console.log(err);
    });
}
