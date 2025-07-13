export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
  }, {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
  }];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

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
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId)
      newCart.push(cartItem);
  });

  cart = newCart;
  saveToStorage();
}