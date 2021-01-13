document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('getAddress')
    .addEventListener('click', handleFormValidation);
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
    // getAddress(postcode);
  }
};

function getAddress(postcode) {
  console.log('Fetching addresses...');
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
