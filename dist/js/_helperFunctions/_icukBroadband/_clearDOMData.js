const _clearDOMData = () => {
  // Clearing containers if contains values
  document.querySelector('msgBroadband').innerHTML = '';
  document.querySelector('broadbandDeals').innerHTML = '';
  document.querySelector('broadbandOrder').innerHTML = '';
};

export { _clearDOMData };
