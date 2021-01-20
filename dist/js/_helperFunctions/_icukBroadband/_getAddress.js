import { _warningMessage } from '../_warningMessage.js';

const _getAddress = (postcode) => {
  console.log('Fetching addresses for postcode provided...');
  const URL = '/ndg/_getAddresses/' + postcode;
  console.log(URL);
  const msg = document.querySelector('msgBroadband');

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      let value = 0;
      console.log(data);
      if (data.message === 'Request failed with status code 403') {
        console.log('ApiExceptionMessage. Making request for area...');
        msg.innerHTML = _warningMessage('IP not whitelisted');
        return;
      }
      if (data.addresses.length === 0) {
        msg.innerHTML = `<h2 class="text-warning">Postcode not valid</h2>`;
      } else {
        let sortedJASON = _sortAddresses(data, 'thoroughfare_number', true);

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

export { _getAddress };
