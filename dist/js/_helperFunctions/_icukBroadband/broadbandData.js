const broadbandProviders = {
  WBC_21CN: 'WBC_21CN',
  WBC_20CN: 'WBC_20CN',
  CABLE_AND_WIRELESS: 'CABLE_AND_WIRELESS',
  TTB: 'TTB',
};

const saveToSessionStorage = (key, value) => {
  sessionStorage.setItem(key, value);
  console.log(`${key}: `, sessionStorage.getItem(key));
};

export { broadbandProviders, saveToSessionStorage };
