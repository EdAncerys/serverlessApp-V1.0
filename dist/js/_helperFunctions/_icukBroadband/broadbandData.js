const broadbandProviders = {
  WBC_21CN: 'WBC_21CN',
  WBC_20CN: 'WBC_20CN',
  CABLE_AND_WIRELESS: 'CABLE_AND_WIRELESS',
  TTB: 'TTB',
};

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
  console.log(`${key}: `, localStorage.getItem(key));
};

export { broadbandProviders, saveToLocalStorage };
