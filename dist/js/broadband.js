document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('getAddress')
    .addEventListener('click', handleFormValidation);

  // Hardcoded input value
  document.getElementById('postcode').value = 'LE157GH';
});

const validatePostcode = (postcode) => {
  postcode = postcode.replace(/\+|\(|\)|\-|\s/gi, '');
  if (/^[A-Za-z]{1,2}(\d{1,2}|[I])[A-Za-z]? ?\d[A-Za-z]{2}$/.test(postcode))
    return true;
  else return false;
};

const handleErrors = (errors) => {
  console.log('error...');
  let msg = document.querySelector('msg');
  document.querySelector('#msg').style.display = 'block';
  let errorMsg = errors.map((err) => {
    return `<li class='err'>${err.msg}</li>`;
  });
  msg.innerHTML = `<ul>${errorMsg}</ul>`;
  setTimeout(() => {
    document.querySelector('#msg').style.display = 'none';
  }, 2000);
};

const handleFormValidation = (ev) => {
  ev.preventDefault();
  let postcode = document.getElementById('postcode').value.replace(/\s/g, '');
  let errors = [];

  console.log('Validating From...');
  console.log(postcode);

  if (!postcode) errors.push({ msg: 'Please enter your postcode' });

  if (!validatePostcode(postcode) && postcode)
    errors.push({ msg: 'Postcode not valid' });

  if (errors.length > 0) {
    console.log('Postcode not valid...');
    handleErrors(errors);
  } else {
    console.log('Postcode valid...');
    getAddress(postcode);
  }
};

function getAddress(postcode) {
  console.log('Fetching addresses...');
  const URL = '/ndg/getAddresses/' + postcode;

  console.log(URL);

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      const msg = document.querySelector('msgBroadband');
      const addresses = document.querySelector('addresses');
      const btn = document.querySelector('btnBroadband');

      let content = data.addresses.map((address) => {
        let doorNo =
          address.thoroughfare_number === null
            ? address.premises_name
            : address.thoroughfare_number;
        let streetName = address.thoroughfare_name;
        let postTown = address.post_town;

        let address = {
          sub_premises: address.sub_premises,
          premises_name: address.premises_name,
          thoroughfare_number: address.thoroughfare_number,
          thoroughfare_name: address.thoroughfare_name,
          locality: address.locality,
          post_town: address.post_town,
          county: address.county,
          postcode: address.postcode,
          district_id: address.district_id,
          nad_key: address.nad_key,
        };

        return `<option id="selectedAddress" value="${address}">${doorNo} ${streetName} ${postTown}</option>`;
      });

      msg.innerHTML = `<label for="addresses">Choose your address:</label>`;
      addresses.innerHTML = `<select name="addresses" id="addresses" style="width:600px">
                              ${content}
                            </select>`;
      btn.innerHTML = `<button id='checkAvailability' class="btn btn-danger mt-4" role="button">
                        Check Availability
                        </button>`;

      document
        .getElementById('checkAvailability')
        .addEventListener('click', checkAvailability);
      console.log(data.addresses);
      console.log('Done...');
    })
    .catch((err) => {
      let msg = document.querySelector('msg');
      msg.innerHTML = `<h4>${err}</h4>`;
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
