const _sortBroadbandData = (data, prop, asc) => {
  const dataWithPrice = data.products.map((broadband) => {
    if (broadband.technology === 'ADSL') {
      broadband.price = '£20.20';
      broadband.installation = '£115.00';
    } else if (broadband.technology === 'FTTC') {
      broadband.price = '$28.00';
      broadband.installation = '£115.00';
    } else if (broadband.technology === 'FTTP') {
      broadband.price = '£32.00';
      broadband.installation = '£130.00';
    } else if (broadband.technology === 'AnnexM') {
      broadband.price = '£24.00';
      broadband.installation = '£115.00';
    } else if (broadband.technology === 'WBC_20CN') {
      broadband.price = '£24.00';
      broadband.installation = '£115.00';
    } else if (broadband.technology === 'TTB') {
      broadband.price = '£24.00';
      broadband.installation = '£115.00';
    } else {
      broadband.price = 'Error - not provided';
      broadband.installation = 'Error - not provided';
    }
    return broadband;
  });
  console.log(data);

  const sortedJSON = dataWithPrice.sort((a, b) => {
    if (asc) {
      return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
    } else {
      return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
    }
  });

  return sortedJSON;
};

export { _sortBroadbandData };
