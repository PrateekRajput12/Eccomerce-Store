import { updateCartValue } from "./updateCartValue";

export const getCartProductFromLS = () => {
    // Retrieve cart data from localStorage
    const cartProducts = JSON.parse(localStorage.getItem("cartProductLS")) || [];

    // Update the cart button value
    updateCartValue(cartProducts);

    // Return the cart products
    return cartProducts;
};
