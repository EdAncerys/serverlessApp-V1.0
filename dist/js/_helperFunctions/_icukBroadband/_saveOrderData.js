const _saveOrderData = (
  supplier,
  provider,
  download,
  upload,
  price,
  installation
) => {
  console.table(supplier, provider, download, upload, price, installation);

  sessionStorage.setItem('supplier', supplier);
  sessionStorage.setItem('provider', provider);
  sessionStorage.setItem('download', download);
  sessionStorage.setItem('upload', upload);
  sessionStorage.setItem('price', price);
  sessionStorage.setItem('installation', installation);
  // Save data to session storage
  console.log(provider, sessionStorage.getItem('provider', provider));
};

export { _saveOrderData };
