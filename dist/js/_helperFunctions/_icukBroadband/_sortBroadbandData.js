const _sortBroadbandData = (data, prop, asc) => {
  const dataWithPrice = data.products.map((broadband) => {
    if (broadband.provider === 'WBC_21CN') {
      broadband.price = 'Price A1';
      broadband.installation = 'Price A2';
    } else if (broadband.provider === 'WBC_20CN') {
      broadband.price = 'Price B1';
      broadband.installation = 'Price B2';
    } else if (broadband.provider === 'CABLE_AND_WIRELESS') {
      broadband.price = 'Price C1';
      broadband.installation = 'Price C2';
    } else if (broadband.provider === 'TTB') {
      broadband.price = 'Price D1';
      broadband.installation = 'Price D2';
    } else broadband.price = 'Error - provider not defined';
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
