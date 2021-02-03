import { _errorMessage } from '../_errorMessage.js';
import { _sortBroadbandData } from './_sortBroadbandData.js';
import { _handleBroadbandSelection } from './_handleBroadbandSelection.js';
import { _spinner } from '../_spinner.js';

async function _getBroadbandAvailability() {
  console.log('Getting Broadband Availability...');
  _spinner(true);

  const URL = '/ndg/broadbandAvailability';
  let broadbandAddress = document.querySelector('broadbandAddress');
  let broadbandDeals = document.querySelector('broadbandDeals');
  let validateInput = document.getElementById('selectedAddress').value;

  if (validateInput === 'selectionID') {
    _spinner(false);
    _errorMessage('Please Choose Address', 'warning');
  } else {
    let body = {
      sub_premises: sessionStorage.getItem('sub_premises'),
      premises_name: sessionStorage.getItem('premises_name'),
      thoroughfare_number: sessionStorage.getItem('thoroughfare_number'),
      thoroughfare_name: sessionStorage.getItem('thoroughfare_name'),
      locality: sessionStorage.getItem('locality'),
      post_town: sessionStorage.getItem('post_town'),
      county: sessionStorage.getItem('county'),
      postcode: sessionStorage.getItem('postcode'),
      district_id: sessionStorage.getItem('district_id'),
      nad_key: sessionStorage.getItem('nad_key'),
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
          const err = 'Fall back. No Deals Available for selected address';
          _spinner(false);
          _errorMessage(err, 'warning');
          _getAreaBroadbandAvailability(broadbandAddress, broadbandDeals);
          console.log(err);
        } else {
          let content = _sortBroadbandData(data, 'name', true).map(
            (product) => {
              count += 1;
              return `<tr class="broadbandPlan">
                        <td>${count}</td>
                        <td>${product.name}</td>
                        <td>${product.provider}</td>
                        <td>${product.likely_down_speed}</td>
                        <td>${product.likely_up_speed}</td>
                        <td>${product.price}</td>
                        <td>${product.installation}</td>
                      </tr>`;
            }
          );
          _spinner(false);
          broadbandDeals.innerHTML = `<div id='broadbandContainer_04'>
                                      <div>
                                      <table id='broadbandData' class="table table-hover table-light">
                                        <thead>
                                          <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Supplier</th>
                                            <th scope="col">Provider</th>
                                            <th scope="col">Download</th>
                                            <th scope="col">Upload</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Installation</th>
                                          </tr>
                                          </thead>
                                            <tbody>
                                              ${content}
                                            </tbody>
                                        </table>
                                        </div>
                                      </div>`;
          document
            .getElementById('broadbandData')
            .addEventListener('click', _handleBroadbandSelection);
          let msgTitle = document.createElement('p');
          msgTitle.innerHTML =
            '<h4 class="alignHorizontally">Available Broadband Deals</h4>';
          broadbandAddress.appendChild(msgTitle);
          broadbandDeals.classList.add('broadbandDeals');
        }
      })
      .catch((err) => {
        _spinner(false);
        _errorMessage('woops...something went wrong please try again');

        console.log('error');
        console.log(err);
      });
  }
}

const _getAreaBroadbandAvailability = (broadbandAddress, broadbandDeals) => {
  const oderPostcode = _handlePostcode(sessionStorage.getItem('postcode'));

  const URL = '/ndg/getAreaBroadbandAvailability/' + oderPostcode;
  console.log(URL);
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      let count = -1;

      let content = _sortBroadbandData(data, 'name', true).map((product) => {
        count += 1;
        return `<tr class="broadbandPlan">
                      <td>${count}</td>
                      <td>${product.name}</td>
                      <td>${product.likely_down_speed}</td>
                      <td>${product.likely_up_speed}</td>
                      <td>${product.price}</td>
                      <td>${product.installation}</td>
                    </tr>`;
      });
      _spinner(false);
      broadbandDeals.innerHTML = `<div id='broadbandContainer_04'>
                                      <div>
                                      <table id='broadbandData' class="table table-hover table-light">
                                        <thead>
                                          <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Supplier</th>
                                            <th scope="col">Download</th>
                                            <th scope="col">Upload</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Installation</th>
                                          </tr>
                                          </thead>
                                            <tbody>
                                              ${content}
                                            </tbody>
                                        </table>
                                        </div>
                                      </div>`;
      document
        .getElementById('broadbandData')
        .addEventListener('click', _handleBroadbandSelection);
      let msgTitle = document.createElement('p');
      msgTitle.innerHTML =
        '<h4 class="alignHorizontally">Available Broadband Deals</h4>';
      broadbandAddress.appendChild(msgTitle);
      broadbandDeals.classList.add('broadbandDeals');
    })
    .catch((err) => {
      _spinner(false);
      _errorMessage(
        'Fall back function. woops...something went wrong please try again'
      );

      console.log('error');
      console.log(err);
    });
};

const _handlePostcode = (postcode) => {
  postcode = postcode.replace(/\+|\(|\)|\-|\s/gi, '');
  return postcode;
};

export { _getBroadbandAvailability };
