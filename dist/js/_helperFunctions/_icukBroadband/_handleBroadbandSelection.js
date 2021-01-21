const _handleBroadbandSelection = (event) => {
  const closestCell = event.target.closest('tr'),
    activeCell = event.currentTarget.querySelector('tr.selected');
  closestCell.classList.add('selected');
  if (activeCell) activeCell.classList.remove('selected');
};

export { _handleBroadbandSelection };
