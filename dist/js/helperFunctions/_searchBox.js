const _searchBox = () => {
  const searchBox = document.querySelector('#searchBox');
  let keyword;
  if (searchBox) keyword = searchBox.value.toLowerCase();
  console.log(`Search keyword: ` + keyword);
  const searchRowComponent = document.querySelectorAll('searchRowComponent');

  searchRowComponent.forEach((row) => {
    let matchFound;

    const search = row.getElementsByTagName('search');
    Array.prototype.map.call(search, (list) => {
      const nodeText = list.innerHTML.toLowerCase();
      if (nodeText.includes(keyword)) matchFound = true;
    });

    if (matchFound) {
      row.style.display = 'block';
    } else {
      row.style.display = 'none';
    }
  });
};

export { _searchBox };
