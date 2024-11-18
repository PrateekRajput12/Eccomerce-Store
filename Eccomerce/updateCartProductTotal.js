import { getCartProductFromLS } from "./getCartProducts";

export const updateCartProductTotal = () => {
  // Get the DOM elements for the totals
  let productSubTotal = document.querySelector(".productSubTotal");
  let productFinalTotal = document.querySelector(".productFinalTotal");

  // Check if the elements exist before proceeding
  if (!productSubTotal || !productFinalTotal) {
    console.error("Total price elements not found in the DOM.");
    return;
  }

  // Get the cart products from localStorage
  let localCartProducts = getCartProductFromLS();
  
  // Calculate the total price of all products in the cart
  let totalProductPrice = localCartProducts.reduce((accum, curElem) => {
    let productPrice = parseFloat(curElem.price) || 0; // Handle decimal prices
    return accum + productPrice;
  }, 0);

  // Set the subtotal and final total with shipping fee
  productSubTotal.textContent = `₹${totalProductPrice.toFixed(2)}`; // Ensure two decimal points
  const shippingFee = 50; // Fixed shipping fee (can be dynamic if needed)
  productFinalTotal.textContent = `₹${(totalProductPrice + shippingFee).toFixed(2)}`;
};
