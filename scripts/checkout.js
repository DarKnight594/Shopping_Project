import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProductFetch} from '../data/products.js';
import {cart} from '../data/cart-class.js';

async function loadPage() {
  try {
    await loadProductFetch();
    await new Promise((resolve) => {
      cart.loadCart(() => {
        resolve();
      });
    });
  }
  catch (error) {
    console.error('Unexpected error. Please try again later.');
  }
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();