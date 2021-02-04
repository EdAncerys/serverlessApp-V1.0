const _saveAddressData = () => {
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

  const oderAddress = {
    sub_premises: sessionStorage.setItem('sub_premises', sub_premises),
    premises_name: sessionStorage.setItem('premises_name', premises_name),
    thoroughfare_number: sessionStorage.setItem(
      'thoroughfare_number',
      thoroughfare_number
    ),
    thoroughfare_name: sessionStorage.setItem(
      'thoroughfare_name',
      thoroughfare_name
    ),
    locality: sessionStorage.setItem('locality', locality),
    post_town: sessionStorage.setItem('post_town', post_town),
    county: sessionStorage.setItem('county', county),
    postcode: sessionStorage.setItem('postcode', postcode),
    district_id: sessionStorage.setItem('district_id', district_id),
    nad_key: sessionStorage.setItem('nad_key', nad_key),
  };

  // Save data to session storage
  sessionStorage.setItem('oderAddress', oderAddress);
  console.log(
    'Data saved to session storage for: ' +
      sessionStorage.getItem('premises_name') +
      ' ' +
      sessionStorage.getItem('thoroughfare_name')
  );
};

export { _saveAddressData };
