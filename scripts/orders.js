import {getProduct, loadProductFetch} from "../data/products.js";
import {orders} from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {formatCurrency} from "./utils/money.js";
import {cart} from '../data/cart-class.js';
import {calculateDeliveryDateFrom, deliveryOptions} from "../data/deliveryOptions.js";

export function deliveryDateFrom(order, productDetails) {
  const matchedOption = findDeliveryOption(order.orderTime, productDetails.estimatedDeliveryTime);

  let deliveryDate = 'undefined';
  if(matchedOption)
    deliveryDate = calculateDeliveryDateFrom(order.orderTime, matchedOption);

  function countDaysBetween(startDate, endDate) {
    return dayjs(endDate).diff(dayjs(startDate), 'day');
  }

  function findDeliveryOption(orderTime, estimatedDeliveryTime){
    const daysBetween = countDaysBetween(orderTime, estimatedDeliveryTime);
    return deliveryOptions.find(option => option.deliveryDays === daysBetween) || null;
  }
  return deliveryDate;
}

async function loadPage() {
  updateCartQuantity();
  await loadProductFetch();
  let ordersHTML = '';

  orders.forEach((order) => {
    const orderTimeString = dayjs(order.orderTime).format('MMMM D');

    ordersHTML += 
    `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTimeString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
         ${productsListHTML(order)}
        </div>
      </div>
    `
  });

  function productsListHTML(order) {
    let productsListHTML = '';

    order.products.forEach((productDetails) => {
    const product = getProduct(productDetails.productId);
    const deliveryDate = deliveryDateFrom(order, productDetails);

      productsListHTML += 
      `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>
        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${deliveryDate}
          </div>
          <div class="product-quantity">
            Quantity: ${productDetails.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again" data-product-id="${product.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });

    return productsListHTML;
  }

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

  document.querySelectorAll('.js-buy-again').forEach((button) => {
    button.addEventListener('click', () => {
      cart.addToCart(button.dataset.productId);
      updateCartQuantity();
      button.innerHTML = 'Added';
      setTimeout(() => {
        button.innerHTML = `
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        `;
      }, 1000);
    });
  });

  function updateCartQuantity() {
    const cartQuantity = cart.calculateCartQuantity();
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }
}

loadPage();