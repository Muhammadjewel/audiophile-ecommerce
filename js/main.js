function init () {
  const MINIMUM_ITEM_COUNT = 1;
  const MAXIMUM_ITEM_COUNT = 10;

  // Header
  const elHeader = document.querySelector('.header');
  const elsHeaderToggler = elHeader.querySelectorAll('.header__toggler');

  // Click outside
  // Esc keyup

  elsHeaderToggler.forEach(function (elHeaderToggler) {
    elHeaderToggler.addEventListener('click', function () {
      const target = elHeaderToggler.dataset.target;

      if (target === 'menu') {
        elHeader.classList.toggle('header--menu-open');
        elHeader.classList.remove('header--cart-open');
      }

      if (target === 'cart') {
        elHeader.classList.toggle('header--cart-open');
        elHeader.classList.remove('header--menu-open');
      }
    });
  });

  // Number controls
  const elNumberControlsDecrementButton =  document.querySelectorAll('.number-controls__button--decrement');
  const elNumberControlsIncrementButton =  document.querySelectorAll('.number-controls__button--increment');

  elNumberControlsDecrementButton.forEach(function (elButton) {
    elButton.addEventListener('click', function (evt) {
      changeItemCount(evt, 'decrement')
    });
  });

  elNumberControlsIncrementButton.forEach(function (elButton) {
    elButton.addEventListener('click', function (evt) {
      changeItemCount(evt, 'increment')
    });
  });

  function changeItemCount (numberControlsButtonClickEvt, action) {
    const parentNumberControls = numberControlsButtonClickEvt.target.closest('.number-controls');
    let currentItemCount = parseInt(parentNumberControls.dataset.itemCount, 10);

    if (action === 'increment' && currentItemCount === MAXIMUM_ITEM_COUNT) {
      return;
    }

    if (action === 'decrement' && currentItemCount === MINIMUM_ITEM_COUNT) {
      return;
    }

    if (action === 'increment') {
      currentItemCount++;
    }

    if (action === 'decrement') {
      currentItemCount--;
    }

    parentNumberControls.dataset.itemCount = currentItemCount;
    parentNumberControls.querySelector('.number-controls__count-value').textContent = currentItemCount;
  }
}

document.addEventListener('DOMContentLoaded', init);
