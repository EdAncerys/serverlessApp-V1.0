const broadbandData = {
  oderCustomerName: 'HardCoded Name value',
  oderCustomerEmail: 'HardCoded email value',
  oderSubject: '',
  oderPostcode: '',
  oderAddress: '',
  oderDeal: '',

  // Broadband providers
  WBC_21CN: 'WBC_21CN',
  WBC_20CN: 'WBC_20CN',
  CABLE_AND_WIRELESS: 'CABLE_AND_WIRELESS',
  TTB: 'TTB',
};

const amendBroadbandData = (key, value) => {
  broadbandData[key] = value;
  console.log(broadbandData);

  return broadbandData;
};

export { broadbandData, amendBroadbandData };
