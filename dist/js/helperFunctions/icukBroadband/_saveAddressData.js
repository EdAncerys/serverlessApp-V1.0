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

  const data = {
    county,
    district_id,
    locality,
    nad_key,
    post_town,
    postcode,
    premises_name,
    sub_premises,
    thoroughfare_name,
    thoroughfare_number,
  };

  sessionStorage.setItem('oneTouchData', JSON.stringify(data));
};

export { _saveAddressData };
