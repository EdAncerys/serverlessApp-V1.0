document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('getAddress')
    .addEventListener('click', handleFormValidation);

  // Hardcoded input value
  document.getElementById('postcode').value = 'LE15 7GH'; // LE15 7GH
});

// Hold selection values in file scope
let oderCustomerName = 'HardCoded Name value';
let oderCustomerEmail = 'HardCoded email value';
let oderSubject =
  'Broadband Order' + ' | Created at: ' + new Date().toLocaleString();
let oderPostcode = '';
let oderAddress = '';
let oderDeal = '';

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
  // Clearing containers if contains values
  document.querySelector('msgBroadband').innerHTML = '';
  document.querySelector('broadbandDeals').innerHTML = '';

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
    oderPostcode = postcode;
    getAddress(postcode);
  }
};

const handleSubmission = () => {
  const formContainer = document.getElementById('form');
  const msgContainer = document.getElementById('msgBroadband');
  const msg = document.querySelector('msg');
  formContainer.style.display = 'none';
  msgContainer.style.display = 'none';

  msg.innerHTML = `<h4>Thank You!</h4> 
                  <h4>Order Been Placed successfully</h4>`;
  setTimeout(() => {
    formContainer.style.display = 'block';
    msgContainer.style.display = 'block';
    msg.innerHTML = '';
  }, 3000);
};

const sortJSONData = (data, prop, asc) => {
  // data = data.addresses.map((address) => {
  //   address.thoroughfare_number = '0' + address.thoroughfare_number;
  //   console.log(address.thoroughfare_number);
  //   return address;
  // });
  // console.log(data);

  const sortedJSON = data.addresses.sort((a, b) => {
    if (asc) {
      return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
    } else {
      return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
    }
  });

  return sortedJSON;
};

const getAddress = (postcode) => {
  console.log('Fetching addresses...');
  const URL = '/ndg/getAddresses/' + postcode;

  console.log(URL);

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      const msg = document.querySelector('msgBroadband');
      let value = 0;

      if (data.addresses.length === 0) {
        msg.innerHTML = `<h2 class="text-warning">Postcode not valid</h2>`;
      } else {
        let sortedJASON = sortJSONData(data, 'thoroughfare_number', true);

        let content = sortedJASON.map((address) => {
          let thoroughfare_number =
            address.thoroughfare_number === null
              ? address.premises_name
              : address.thoroughfare_number;
          let thoroughfare_name =
            address.thoroughfare_name === null ? '' : address.thoroughfare_name;
          let county = address.county === null ? '' : address.county;
          let postcode = address.postcode;

          value += 1;
          return `<option value="${value}"
                  thoroughfare_number="${address.thoroughfare_number}" 
                  thoroughfare_name="${address.thoroughfare_name}" 
                  premises_name="${address.premises_name}" 
                  sub_premises="${address.sub_premises}"
                  locality="${address.locality}" 
                  post_town="${address.post_town}" 
                  county="${address.county}"  
                  postcode="${address.postcode}"  
                  district_id="${address.district_id}"
                  nad_key="${address.nad_key}"    
                  >${thoroughfare_number} ${thoroughfare_name} ${county} ${postcode}</option>`;
        });

        msg.innerHTML = `<h2>Choose your address:</h2>
                          <select name="selectedAddress" id="selectedAddress" style="width:600px" onChange="logAddressData()">
                            <option selected disabled hidden value='selectionID'>Please Choose Your Address</option>
                            ${content}
                          </select>
                          <button id='getBroadbandAvailability' class="btn btn-danger mt-4" role="button" onClick='getBroadbandAvailability(event)'>
                            Check Availability
                          </button>`;

        // console.log(data.addresses);
        console.log('Done fetching addresses...');
      }
    })
    .catch((err) => {
      let msg = document.querySelector('msg');
      msg.innerHTML = `<h4>${err}</h4>`;
      console.log(err);
    });
};

const getBroadbandAvailability = (ev) => {
  ev.preventDefault();
  let broadbandDeals = document.querySelector('broadbandDeals');
  broadbandDeals.innerHTML = '';
  console.log('Getting Broadband Availability...');

  const URL = '/ndg/broadbandAvailability';
  let value = document.getElementById('selectedAddress').value;

  if (value === 'selectionID') {
    broadbandDeals.innerHTML =
      '<h4 class="mt-4 text-warning">Please Choose Address</h4>';
  } else {
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
      nad_key, // nad_key throws exception_type: "InternalApiException"
    };
    console.log(body);

    const config = {
      method: 'POST',
      body: JSON.stringify(body),
    };

    fetch(URL, config)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let count = -1;

        if (data.name === 'Error') {
          const msg = 'No Deals Available for selected address';
          console.log(msg);
          broadbandDeals.innerHTML = `<h4 class="mt-4">${msg}</h4>`;
          getAreaBroadbandAvailability();
        } else {
          let content = data.products.map((product) => {
            count += 1;
            return `<tr class='broadbandData' onClick='handleBroadbandSelection(event)'>
                    <td scope="row">${count}</td>
                    <td>${product.name}</td>
                    <td>${product.speed_range}</td>
                    <td>${product.provider}</td>
                    <td>${product.technology}</td>
                  </tr>`;
          });

          broadbandDeals.innerHTML = `<h3 class="displayCenter mt-4">Available Broadband Deals</h3>
                                  <table id='broadbandData' class="table table-hover table-dark">
                                    <thead>
                                    <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">Supplier</th>
                                      <th scope="col">Speed Range</th>
                                      <th scope="col">Provider</th>
                                      <th scope="col">Technology</th>
                                    </tr>
                                    </thead>
                                      <tbody>
                                        ${content}
                                      </tbody>
                                  </table>`;

          console.log('Data submitted successfully...');
        }
      })
      .catch((err) => {
        let broadbandDeals = document.querySelector('broadbandDeals');
        broadbandDeals.innerHTML = `<h4 class="mt-4">whoops...something Went Wrong. Please try again...</h4>`;

        console.log('error');
        console.log(err);
      });
  }
};

const getAreaBroadbandAvailability = () => {
  let broadbandDeals = document.querySelector('broadbandDeals');
  broadbandDeals.innerHTML = '';
  console.log('Getting Area Broadband Availability...');

  const URL = '/ndg/getAreaBroadbandAvailability/' + oderPostcode;
  let value = document.getElementById('selectedAddress').value;

  if (value === 'selectionID') {
    broadbandDeals.innerHTML = '<h4 class="mt-4">Please Choose Address</h4>';
  } else {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let count = -1;

        let content = data.products.map((product) => {
          count += 1;
          return `<tr class='broadbandData' onClick='handleBroadbandSelection(event)'>
                    <td scope="row">${count}</td>
                    <td>${product.name}</td>
                    <td>${product.speed_range}</td>
                    <td>${product.provider}</td>
                    <td>${product.technology}</td>
                  </tr>`;
        });

        broadbandDeals.innerHTML = `<h3 class="displayCenter mt-4 text-warning">Available Area Broadband Deals</h3>
                                  <table id='broadbandData' class="table table-hover table-dark">
                                    <thead>
                                    <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">Supplier</th>
                                      <th scope="col">Speed Range</th>
                                      <th scope="col">Provider</th>
                                      <th scope="col">Technology</th>
                                    </tr>
                                    </thead>
                                      <tbody>
                                        ${content}
                                      </tbody>
                                  </table>`;

        console.log('Data submitted successfully...');
      })
      .catch((err) => {
        let broadbandDeals = document.querySelector('broadbandDeals');
        broadbandDeals.innerHTML = `<h4 class="mt-4">whoops...something Went Wrong. Please try again...</h4>`;

        console.log('error');
        console.log(err);
      });
  }
};

const placeBroadbandOrder = () => {
  console.log('Placing Broadband Order...');

  let sub_premises =
    oderAddress.sub_premises === 'null' ? '' : oderAddress.sub_premises;
  let premises_name =
    oderAddress.premises_name === 'null' ? '' : oderAddress.premises_name;
  let thoroughfare_number =
    oderAddress.thoroughfare_number === 'null'
      ? ''
      : oderAddress.thoroughfare_number;
  let thoroughfare_name =
    oderAddress.thoroughfare_name === 'null'
      ? ''
      : oderAddress.thoroughfare_name;
  let locality = oderAddress.locality === 'null' ? '' : oderAddress.locality;
  let county = oderAddress.county === 'null' ? '' : oderAddress.county;
  let post_town = oderAddress.post_town === 'null' ? '' : oderAddress.post_town;
  let postcode = oderAddress.postcode === 'null' ? '' : oderAddress.postcode;

  const URL = '/ndg/contactUs';
  const body = {
    subject: oderSubject,
    description: _contactFormDescriptionHTML(
      'Broadband Order',
      oderCustomerName,
      oderCustomerEmail,
      oderSubject,
      `<p>Postcode: ${oderPostcode}</p>
      <p>Address: ${sub_premises} ${premises_name} ${thoroughfare_number} ${thoroughfare_name} ${locality} ${post_town} ${county} ${postcode}</p>
      <p  style="
      color: #d5dde5;
      background: #1b1e24;
      font-size: 24px;
      font-weight: 400;
      padding: 20px;
      text-align: center;
      vertical-align: middle;
    ">Selected Broadband Deal</p> 
      <p>Supplier: ${oderDeal.supplier}</p>
      <p>SpeedRange: ${oderDeal.speedRange}</p>
      <p>Technology: ${oderDeal.technology}</p>`
    ),
  };

  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  fetch(URL, config)
    .then((res) => res.json())
    .then((data) => {
      handleSubmission();

      console.log(data);
      console.log('Order Placed successfully...');
    })
    .catch((err) => {
      let msg = document.querySelector('msg');
      msg.innerHTML = `<h4>${err}</h4>`;

      console.log('error');
      console.log(err);
    });
};

const handleBroadbandSelection = (event) => {
  console.log('Broadband Deal Selected...');
  let broadbandOrder = document.querySelector('broadbandOrder');
  broadbandOrder.innerHTML = `<button id='placeBroadbandOrder' class="btn btn-warning mt-4" role="button" onClick="placeBroadbandOrder()">
                                Place Order
                              </button>`;

  console.log(event.target.parentNode);
  event.target.parentNode.style.backgroundColor = 'gray';
  let rowId = event.target.parentNode.children[0].innerHTML;
  let supplier = event.target.parentNode.children[1].innerHTML;
  let speedRange = event.target.parentNode.children[2].innerHTML;
  let technology = event.target.parentNode.children[3].innerHTML;

  oderDeal = {
    rowId,
    supplier,
    speedRange,
    technology,
  };

  console.log(oderDeal);
};

const logAddressData = () => {
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

  oderAddress = {
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
  console.log(oderAddress);
};

const _contactFormDescriptionHTML = (
  value,
  name,
  email,
  subject,
  description
) => {
  return ` <div style="padding: 30px">
  <table>
    <tr>
      <th
        colspan="2"
        style="
          color: #d5dde5;
          background: #1b1e24;
          border: 1px solid #343a45;
          font-size: 24px;
          font-weight: 400;
          padding: 20px;
          text-align: center;
          text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
          vertical-align: middle;
        "
      >
        ${value}
      </th>
    </tr>

    <tr style="padding: 5px">
      <th
        style="
          border: 1px solid #c1c3d1;
          color: #666b85;
          font-size: 16px;
          font-weight: normal;
          padding: 20px;
          text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
        "
      >
        Name
      </th>
      <th
        style="
          border: 1px solid #c1c3d1;
          color: #666b85;
          font-size: 16px;
          font-weight: normal;
          padding: 20px;
          text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
        "
      >
        ${name}
      </th>
    </tr>
    <tr style="padding: 5px">
      <th
        style="
          border: 1px solid #c1c3d1;
          color: #666b85;
          font-size: 16px;
          font-weight: normal;
          padding: 20px;
          text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
        "
      >
        Email
      </th>
      <th
        style="
          border: 1px solid #c1c3d1;
          color: #666b85;
          font-size: 16px;
          font-weight: normal;
          padding: 20px;
          text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
        "
      >
        ${email}
      </th>
    </tr>
    <tr style="padding: 5px">
      <th
        style="
          border: 1px solid #c1c3d1;
          color: #666b85;
          font-size: 16px;
          font-weight: normal;
          padding: 20px;
          text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
        "
      >
        Subject
      </th>
      <th
        style="
          border: 1px solid #c1c3d1;
          color: #666b85;
          font-size: 16px;
          font-weight: normal;
          padding: 20px;
          text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
        "
      >
        ${subject}
      </th>
    </tr>
    <tr style="padding: 5px">
      <th
        style="
          border: 1px solid #c1c3d1;
          color: #666b85;
          font-size: 16px;
          font-weight: normal;
          padding: 20px;
          text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
        "
      >
        Description
      </th>
      <th
        style="
          border: 1px solid #c1c3d1;
          color: #666b85;
          font-size: 16px;
          font-weight: normal;
          padding: 20px;
          text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
        "
      >
        ${description}
      </th>
    </tr>
  </table>
</div>`;
};

const sortJSON = (data, prop, asc) => {
  const sortedJSON = data.addresses.sort((a, b) => {
    if (asc) {
      return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
    } else {
      return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
    }
  });
  console.log(sortedJSON);
  return sortedJSON;
};
