const _clearDOMData = (container) => {
  // Clearing containers if contains values
  container === 'broadbandAddress'
    ? ''
    : (document.querySelector('broadbandAddress').innerHTML = '');
  container === 'broadbandDeals'
    ? ''
    : (document.querySelector('broadbandDeals').innerHTML = '');
  container === 'broadbandOrder'
    ? ''
    : (document.querySelector('broadbandOrder').innerHTML = '');
};

export { _clearDOMData };
