const _validatePostcode = (postcode) => {
  postcode = postcode.replace(/\+|\(|\)|\-|\s/gi, '');
  if (/^[A-Za-z]{1,2}(\d{1,2}|[I])[A-Za-z]? ?\d[A-Za-z]{2}$/.test(postcode))
    return true;
  else return false;
};

export { _validatePostcode };
