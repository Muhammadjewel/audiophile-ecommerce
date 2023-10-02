function init () {
  const MINIMUM_ITEM_COUNT = 1;
  const MAXIMUM_ITEM_COUNT = 10;

  // Header
  const elHeader = document.querySelector('.header');
  const elsHeaderToggler = elHeader.querySelectorAll('.header__toggler');

  // Click outside
  // Esc keyup

  function closeHeaderCart () {
    elHeader.classList.remove('header--cart-open');
  }

  function closeHeaderMenu () {
    elHeader.classList.remove('header--menu-open');
  }

  function elHeaderEscKeyupHandler (evt) {
    if (evt.key === 'Escape') {
      closeHeaderCart();
      closeHeaderMenu();
      document.removeEventListener('keyup', elHeaderEscKeyupHandler);
    }
  }

  elsHeaderToggler.forEach(function (elHeaderToggler) {
    elHeaderToggler.addEventListener('click', function () {
      const target = elHeaderToggler.dataset.target;

      if (target === 'menu') {
        elHeader.classList.toggle('header--menu-open');
        closeHeaderCart();
      }

      if (target === 'cart') {
        elHeader.classList.toggle('header--cart-open');
        closeHeaderMenu();
      }

      // Close header popups when click outside and Esc keyup
      let isHeaderPopupsOpen = elHeader.classList.contains('header--menu-open') || elHeader.classList.contains('header--cart-open');

      if (isHeaderPopupsOpen) {
        document.addEventListener('keyup', elHeaderEscKeyupHandler);
      } else {
        document.removeEventListener('keyup', elHeaderEscKeyupHandler);
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


  // CHECKOUT FORM
  const elCheckoutForm = document.querySelector('#checkout-form');
  let elFormPaymentMethodTabs = '';
  let elsFormPaymentMethodTab = '';
  let elsFormPaymentEMoneyField = '';

  if (elCheckoutForm) {
    elFormPaymentMethodTabs = elCheckoutForm.querySelector('.form-payment-method__tabs');
    elsFormPaymentMethodTab = elCheckoutForm.querySelectorAll('.form-payment-method__tab');
    elsFormPaymentEMoneyField = elCheckoutForm.querySelectorAll('.form-payment-method__e-money-field');
  }

  function hidePaymentMethodTabs () {
    elsFormPaymentMethodTab.forEach(function (elFormPaymentMethodTab) {
      elFormPaymentMethodTab.setAttribute('hidden', 'true');
    });
  }

  function enableEMoneyFields() {
    elsFormPaymentEMoneyField.forEach(function (elFormPaymentEMoneyField) {
      elFormPaymentEMoneyField.removeAttribute('disabled');
    });
  }

  function disableEMoneyFields() {
    elsFormPaymentEMoneyField.forEach(function (elFormPaymentEMoneyField) {
      elFormPaymentEMoneyField.setAttribute('disabled', 'true');
    });
  }

  // TODO: move change event listener to list and capture input change
  if (elCheckoutForm) {
    const elsPaymentMethodRadioInputs = elCheckoutForm.querySelectorAll('.form-payment-method__radio-input');

    elsPaymentMethodRadioInputs.forEach(function (elPaymentMethodRadioInput) {
      elPaymentMethodRadioInput.addEventListener('change', function () {
        hidePaymentMethodTabs();
        disableEMoneyFields();

        const target = elPaymentMethodRadioInput.dataset.target;
        elFormPaymentMethodTabs.querySelector(`[data-tab="${target}"]`).removeAttribute('hidden');

        if (target === 'e-money') {
          enableEMoneyFields();
        }
      });
    });
  }


  // MODAL
  if (elCheckoutForm) {
    elCheckoutForm.addEventListener('submit', function (evt) {
      evt.preventDefault();

      const elModal = document.querySelector('.modal');
      elModal.classList.add('modal--open');
    });
  }


  // PRODUCTS-LIST
  const elProductsList = document.querySelector('.products-list');
  if (elProductsList) {
    const elProductsListToggler = elProductsList.querySelector('.products-list__toggler');

    if (elProductsListToggler) {
      elProductsListToggler.addEventListener('click', function () {
        elProductsList.classList.toggle('products-list--collapsed');

        elProductsListToggler.textContent = elProductsList.classList.contains('products-list--collapsed') ? 'and 2 other item(s)' : 'View less';
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', init);
