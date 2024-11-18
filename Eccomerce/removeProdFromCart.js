import { getCartProductFromLS } from "./getCartProducts";
import { showToast } from "./showToast";
import { updateCartProductTotal } from "./updateCartProductTotal";
import { updateCartValue } from "./updateCartValue";

export const removeProdFromCart = (id) => {
    // Retrieve the current cart products from localStorage
    let cartProducts = getCartProductFromLS();

    // Filter out the product with the specified ID
    const updatedCartProducts = cartProducts.filter((curProd) => curProd.id !== id);

    // Update localStorage with the modified cart
    localStorage.setItem("cartProductLS", JSON.stringify(updatedCartProducts));

    // Remove the product card from the DOM
    const productCard = document.getElementById(`card${id}`);
    if (productCard) {
        productCard.remove();
        // Display a toast notification
        showToast("delete", id);
    } else {
        console.warn(`Element with ID "card${id}" not found in the DOM.`);
    }

    // Update the cart total and value
    updateCartProductTotal();
    updateCartValue(updatedCartProducts);
};
