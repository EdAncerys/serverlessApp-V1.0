const _saveOrderData = (
  supplier,
  provider,
  download,
  upload,
  price,
  installation
) => {
  const oderData = {
    supplier: sessionStorage.setItem('supplier', supplier),
    provider: sessionStorage.setItem('provider', provider),
    download: sessionStorage.setItem('download', download),
    upload: sessionStorage.setItem('upload', upload),
    price: sessionStorage.setItem('price', price),
    installation: sessionStorage.setItem('installation', installation),
  };

  // Save data to session storage
  sessionStorage.setItem('oderData', oderData);
  console.log(
    'Data saved to session storage for: ' +
      sessionStorage.getItem('supplier') +
      ' ' +
      sessionStorage.getItem('price')
  );
};

export { _saveOrderData };
