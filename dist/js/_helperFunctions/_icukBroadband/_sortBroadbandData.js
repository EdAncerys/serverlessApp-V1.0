import { broadbandProviders } from './broadbandData.js';

const _sortBroadbandData = (data, prop, asc) => {
  const dataWithPrice = data.products.map((broadband) => {
    if (broadband.provider === broadbandProviders.WBC_21CN) {
      broadband.price = 'Price A';
    } else if (broadband.provider === broadbandProviders.WBC_20CN) {
      broadband.price = 'Price B';
    } else if (broadband.provider === broadbandProviders.CABLE_AND_WIRELESS) {
      broadband.price = 'Price C';
    } else if (broadband.provider === broadbandProviders.TTB) {
      broadband.price = 'Price D';
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
