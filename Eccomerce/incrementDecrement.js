import { getCartProductFromLS } from "./getCartProducts";
import { updateCartProductTotal } from "./updateCartProductTotal";

export const incrementDecrement = (event, id, stock, price) => {
    // Select the card element and its child elements
    const currentCardElement = document.querySelector(`#card${id}`);
    if (!currentCardElement) {
        console.error(`Card element with ID "card${id}" not found.`);
        return;
    }

    const productQuantity = currentCardElement.querySelector(".productQuantity");
    const productPrice = currentCardElement.querySelector(".productPrice");
    if (!productQuantity || !productPrice) {
        console.error(
            `Missing required elements (quantity or price) in card with ID "card${id}".`
        );
        return;
    }

    // Default values
    let quantity = 1;
    let localStoragePrice = price;

    // Retrieve and check existing product data from localStorage
    const localCartProducts = getCartProductFromLS();
    const existingProd = localCartProducts.find((curProd) => curProd.id === id);

    if (existingProd) {
        quantity = existingProd.quantity;
        localStoragePrice = existingProd.price;
    }

    // Increment or decrement the quantity
    if (event.target.classList.contains("cartIncrement")) {
        if (quantity < stock) {
            quantity += 1;
        } else {
            console.warn(`Reached maximum stock (${stock}).`);
            quantity = stock;
        }
    } else if (event.target.classList.contains("cartDecrement")) {
        if (quantity > 1) {
            quantity -= 1;
        } else {
            console.warn("Minimum quantity is 1.");
        }
    }

    // Update price and cart data
    localStoragePrice = Number((price * quantity).toFixed(2));

    const updatedCart = localCartProducts.map((curProd) =>
        curProd.id === id ? { id, quantity, price: localStoragePrice } : curProd
    );

    // Save updated cart to localStorage
    localStorage.setItem("cartProductLS", JSON.stringify(updatedCart));

    // Update UI
    productQuantity.innerText = quantity;
    productPrice.innerText = `₹${localStoragePrice}`;

    // Update cart total on the cart products page
    updateCartProductTotal();
};
