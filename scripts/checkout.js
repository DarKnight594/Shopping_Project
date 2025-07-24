import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProductFetch} from '../data/products.js';
import {loadCart} from '../data/cart.js';

async function loadPage() {
  try {
    await loadProductFetch();
    await new Promise((resolve, reject) => {
      loadCart(() => {
        //reject();
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

// Promise.all([
//   loadProductFetch(),
//   new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     });
//   })

// ]).then(() => {
//   renderCheckoutHeader();
//   renderOrderSummary();
//   renderPaymentSummary();
// });
