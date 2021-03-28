const _sortBroadbandData = (data, prop, asc) => {
  const dataWithPrice = data.products.map((broadband) => {
    if (broadband.name === '20CN ADSL Max') {
      broadband.price = '£20.20';
      broadband.installation = '£115.00';
    } else if (broadband.name === '21CN ADSL 2+') {
      broadband.price = '£28.00';
      broadband.installation = '£115.00';
    } else if (broadband.name === '21CN Annex M') {
      broadband.price = '£32.00';
      broadband.installation = '£130.00';
    } else if (broadband.name === 'Fibre to the Cabinet (FTTC)') {
      broadband.price = '£24.00';
      broadband.installation = '£115.00';
    } else if (broadband.name === 'Fibre to the Premises (FTTP)') {
      broadband.price = '£24.00';
      broadband.installation = '£115.00';
    } else if (broadband.name === 'FTTP on Demand') {
      broadband.price = '£24.00';
      broadband.installation = '£115.00';
    } else if (broadband.name === 'G.Fast') {
      broadband.price = '£24.00';
      broadband.installation = '£115.00';
    } else if (broadband.name === 'TalkTalk LLU ADSL 2+') {
      broadband.price = '£24.00';
      broadband.installation = '£115.00';
    } else if (broadband.name === 'TalkTalk LLU Annex M') {
      broadband.price = '£24.00';
      broadband.installation = '£115.00';
    } else if (broadband.name === 'TalkTalk FTTC') {
      broadband.price = '£24.00';
      broadband.installation = '£115.00';
    } else if (broadband.name === 'TalkTalk G.Fast') {
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
