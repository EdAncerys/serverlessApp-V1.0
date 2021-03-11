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

  sessionStorage.setItem('sub_premises', sub_premises);
  sessionStorage.setItem('premises_name', premises_name);
  sessionStorage.setItem('thoroughfare_number', thoroughfare_number);
  sessionStorage.setItem('thoroughfare_name', thoroughfare_name);
  sessionStorage.setItem('locality', locality);
  sessionStorage.setItem('post_town', post_town);
  sessionStorage.setItem('county', county);
  sessionStorage.setItem('postcode', postcode);
  sessionStorage.setItem('district_id', district_id);
  sessionStorage.setItem('nad_key', nad_key);
};

export { _saveAddressData };
