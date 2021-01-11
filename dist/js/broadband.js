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
                        <select name="districtID" id="districtID" style="width:400px">
                          ${content}
                        </select><br/>
                        <button id='checkAvailability' class="btn btn-danger" role="button"
                        >Check Availability</button>`;

      document
        .getElementById('checkAvailability')
        .addEventListener('click', checkAvailability);
      console.log(data.addresses);
      console.log('Done...');
    })
    .catch((err) => {
      let main = document.querySelector('main');
      main.innerHTML = `<h4>${err}</h4>`;
      console.log(err);
    });
}

function checkAvailability(ev) {
  ev.preventDefault();
  console.log('Getting Broadband Deals...');

  const URL = '/ndg/broadbandAvailability';
  const postcode = document.getElementById('postCode').value;
  const district_id = document.getElementById('districtID').value;

  const body = {
    postcode,
    district_id,
  };
  console.log(body);

  const headers = {
    'Content-Type': 'application/json',
  };

  const config = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  };

  // fetch(URL, config)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     let main = document.querySelector('main');
  //     main.innerHTML = `<h4>${data}</h4>`;

  //     console.log(data);
  //     console.log('Done...');
  //   })
  //   .catch((err) => {
  //     let main = document.querySelector('main');
  //     main.innerHTML = `<h4>${err}</h4>`;
  //     console.log(err);
  //   });
}
