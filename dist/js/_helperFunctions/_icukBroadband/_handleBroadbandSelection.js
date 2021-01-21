const _handleBroadbandSelection = (event) => {
  const header = event.target.parentNode.children[1].innerHTML;

  if (header !== 'Supplier') {
    const closestCell = event.target.closest('tr'),
      activeCell = event.currentTarget.querySelector('tr.selected');
    closestCell.classList.add('selected');
    if (activeCell) activeCell.classList.remove('selected');
  }
};

export { _handleBroadbandSelection };
