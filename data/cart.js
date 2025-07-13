export const cart = [];

export function addToCart(productId) {
  let matchingItem;
  const quantityElement = document.querySelector(`.js-quantity-selector-${productId}`);
  const quantity = Number(quantityElement.value);

  const addedMessage = document.querySelector(`.js-added-cart-${productId}`);
  addedMessage.classList.add('added-into-cart');

  let addedMessageTimeoutId;

  setTimeout(() => {
    if(addedMessageTimeoutId)
      clearTimeout(addedMessageTimeoutId);
    const timeOutId = setTimeout(() => {
      addedMessage.classList.remove('added-into-cart');
    }, 2000);
    addedMessageTimeoutId = timeOutId;
  });

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId)
      matchingItem = cartItem;
  });

  if(matchingItem)
    matchingItem.quantity++;
  else{
    cart.push({
      productId,
      quantity
    });
  }
}