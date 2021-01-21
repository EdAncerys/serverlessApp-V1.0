const _handleBroadbandSelection = (event) => {
  const header = event.target.parentNode.children[1].innerHTML;

  if (header !== 'Supplier') {
    const closestCell = event.target.closest('tr'),
      activeCell = event.currentTarget.querySelector('tr.selected');
    closestCell.classList.add('selected');
    if (activeCell) activeCell.classList.remove('selected');
    // Save to local storage
    localStorage.setItem('name', event.target.parentNode.children[1].innerHTML);
    localStorage.setItem(
      'provider',
      event.target.parentNode.children[2].innerHTML
    );
    localStorage.setItem(
      'likely_down_speed',
      event.target.parentNode.children[3].innerHTML
    );
    localStorage.setItem(
      'likely_up_speed',
      event.target.parentNode.children[4].innerHTML
    );
    localStorage.setItem(
      'speed_range',
      event.target.parentNode.children[5].innerHTML
    );
    localStorage.setItem(
      'technology',
      event.target.parentNode.children[6].innerHTML
    );
    localStorage.setItem(
      'price',
      event.target.parentNode.children[7].innerHTML
    );
    localStorage.setItem(
      'installation',
      event.target.parentNode.children[8].innerHTML
    );
    console.log(`Name: `, localStorage.getItem('name'));
  }
};

export { _handleBroadbandSelection };
