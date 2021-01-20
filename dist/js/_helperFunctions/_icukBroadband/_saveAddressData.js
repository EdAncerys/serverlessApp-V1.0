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

  // Save data to local storage
  localStorage.setItem('sub_premises', sub_premises);
  localStorage.setItem('premises_name', premises_name);
  localStorage.setItem('thoroughfare_number', thoroughfare_number);
  localStorage.setItem('thoroughfare_name', thoroughfare_name);
  localStorage.setItem('locality', locality);
  localStorage.setItem('post_town', post_town);
  localStorage.setItem('county', county);
  localStorage.setItem('postcode', postcode);
  localStorage.setItem('district_id', district_id);
  localStorage.setItem('nad_key', nad_key);

  const oderAddress = {
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

export { _saveAddressData };
