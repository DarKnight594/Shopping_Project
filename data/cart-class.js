class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if(!this.cartItems){
      this.cartItems = [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
      }];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId, quantityToAdd = 1) {
    let matchingItem;
    const quantityElement = document.querySelector(`.js-quantity-selector-${productId}`);
    let quantity = quantityToAdd;

    if (quantityElement) {
      const parsedQuantity = Number(quantityElement.value);
      if (!isNaN(parsedQuantity) && parsedQuantity > 0)
        quantity = parsedQuantity;
      else 
        console.warn(`Invalid quantity input for productId: ${productId}. Defaulting to ${quantity}.`);
    }
    else
      console.log(`Quantity input not found for productId: ${productId}. Using default quantity: ${quantity}.`);

    const addedMessage = document.querySelector(`.js-added-cart-${productId}`);
    if (addedMessage) {
      if (addedMessage.timeoutId)
        clearTimeout(addedMessage.timeoutId);
      
      addedMessage.classList.add('added-into-cart');

      const newTimeoutId = setTimeout(() => {
          addedMessage.classList.remove('added-into-cart');
          addedMessage.timeoutId = null;
      }, 2000);

      addedMessage.timeoutId = newTimeoutId;
    }
    else
      console.warn(`Cart message element not found for productId: ${productId}. Cannot display "added to cart" message.`);
    
    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId)
        matchingItem = cartItem;
    });

    if(matchingItem)
      matchingItem.quantity += quantity;
    else{
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId !== productId)
        newCart.push(cartItem);
    });

    this.cartItems = newCart;
    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => { cartQuantity += cartItem.quantity; });
    return cartQuantity;
  }

  updateQuantity(productId, newQuantity) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId)
        matchingItem = cartItem;
    });

    matchingItem.quantity = newQuantity;
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId)
        matchingItem = cartItem;
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }

  resetCart() {
    this.cartItems = [];
    this.saveToStorage();
    console.log('Cart has been cleared.');
  }

  async loadCartFetch() {
    const response = await fetch('https://supersimplebackend.dev/cart');
    const text = await response.text();
    console.log(text);
    return text;
  }
}

export const cart = new Cart('cart');