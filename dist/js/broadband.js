document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('getAddress')
    .addEventListener('click', handleFormValidation);

  // Hardcoded input value
  document.getElementById('postcode').value = 'E163DY';
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

const getAddress = (postcode) => {
  console.log('Fetching addresses...');
  const URL = '/ndg/getAddresses/' + postcode;

  console.log(URL);

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      const msg = document.querySelector('msgBroadband');
      const addresses = document.querySelector('addresses');
      const btn = document.querySelector('btnBroadband');
      let value = -1;

      let content = data.addresses.map((address) => {
        let doorNo =
          address.thoroughfare_number === null
            ? address.premises_name
            : address.thoroughfare_number;
        let streetName = address.thoroughfare_name;
        let postTown = address.post_town;

        value += 1;
        return `<option value="${value}"
                sub_premises="${address.sub_premises}"
                premises_name="${address.premises_name}" 
                thoroughfare_number="${address.thoroughfare_number}" 
                thoroughfare_name="${address.thoroughfare_name}" 
                locality="${address.locality}" 
                post_town="${address.post_town}" 
                county="${address.county}"  
                postcode="${address.postcode}"  
                district_id="${address.district_id}"
                nad_key="${address.nad_key}"    
                >${doorNo} ${streetName} ${postTown}</option>`;
      });

      msg.innerHTML = `<label for="selectedAddress">Choose your address:</label>`;
      addresses.innerHTML = `<select name="selectedAddress" id="selectedAddress" style="width:600px">
                              ${content}
                            </select>`;
      btn.innerHTML = `<button id='getBroadbandAvailability' class="btn btn-danger mt-4" role="button">
                        Check Availability
                        </button>`;

      document
        .getElementById('getBroadbandAvailability')
        .addEventListener('click', getBroadbandAvailability);
      // console.log(data.addresses);
      console.log('Done fetching addresses...');
    })
    .catch((err) => {
      let msg = document.querySelector('msg');
      msg.innerHTML = `<h4>${err}</h4>`;
      console.log(err);
    });
};

const getBroadbandAvailability = (ev) => {
  ev.preventDefault();
  console.log('Getting Broadband Availability...');

  const URL = '/ndg/broadbandAvailability';
  let value = document.getElementById('selectedAddress').value;
  let sub_premises = document
    .getElementById('selectedAddress')
    [value].getAttribute('sub_premises');
  let premises_name = document
    .getElementById('selectedAddress')
    [value].getAttribute('premises_name');
  let thoroughfare_number = document
    .getElementById('selectedAddress')
    [value].getAttribute('thoroughfare_number');
  let thoroughfare_name = document
    .getElementById('selectedAddress')
    [value].getAttribute('thoroughfare_name');
  let locality = document
    .getElementById('selectedAddress')
    [value].getAttribute('locality');
  let post_town = document
    .getElementById('selectedAddress')
    [value].getAttribute('post_town');
  let county = document
    .getElementById('selectedAddress')
    [value].getAttribute('county');
  let postcode = document
    .getElementById('selectedAddress')
    [value].getAttribute('postcode');
  let district_id = document
    .getElementById('selectedAddress')
    [value].getAttribute('district_id');
  let nad_key = document
    .getElementById('selectedAddress')
    [value].getAttribute('nad_key');

  let body = {
    sub_premises,
    premises_name,
    thoroughfare_number,
    thoroughfare_name,
    locality,
    post_town,
    county,
    postcode,
    district_id,
    nad_key,
  };
  console.log(body);

  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  fetch(URL, config)
    .then((res) => res.json())
    .then((data) => {
      let broadbandDeals = document.querySelector('broadbandDeals');

      let content = data.products.map((product) => {
        return `<div style="margin: 20px; background-color: rgba(4, 0, 0, 0.1)" class="displayCenter">
                  <h3>${product.name}</h3>
                  <h6>speed_range: ${product.speed_range}</h6>
                  <h6>provider: ${product.provider}</h6>
                  <h6>technology: ${product.technology}</h6>
                </div>`;
      });

      broadbandDeals.innerHTML = `<h4>${content}</h4>`;

      console.log(data);
      console.log('Data submitted successfully...');
    })
    .catch((err) => {
      let broadbandDeals = document.querySelector('broadbandDeals');
      broadbandDeals.innerHTML = `<h4>${err}}</h4>`;

      console.log('error');
      console.log(err);
    });
};
