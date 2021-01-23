import { _placeBroadbandOrder } from './_placeBroadbandOrder.js';

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
      'likely_down_speed',
      event.target.parentNode.children[2].innerHTML
    );
    localStorage.setItem(
      'likely_up_speed',
      event.target.parentNode.children[3].innerHTML
    );
    localStorage.setItem(
      'price',
      event.target.parentNode.children[4].innerHTML
    );
    localStorage.setItem(
      'installation',
      event.target.parentNode.children[5].innerHTML
    );
    console.log(`Name: `, localStorage.getItem('name'));

    console.log('Broadband Deal Selected...');
    let broadbandOrder = document.querySelector('broadbandOrder');
    broadbandOrder.innerHTML = `<div>
                                  <button id='placeBroadbandOrder' class="button" style='margin: 2vw 0 30vw 0; width: 40vw' role="button">
                                    Place Order
                                  </button>
                                </div>`;
    document
      .getElementById('placeBroadbandOrder')
      .addEventListener('click', _placeBroadbandOrder);
  }
};

export { _handleBroadbandSelection };
