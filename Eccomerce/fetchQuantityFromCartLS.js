import { getCartProductFromLS } from "./getCartProducts";

export const fetchQuantityFromCartLS = (id, defaultPrice) => {
    // Retrieve the cart data from localStorage
    const cartProducts = getCartProductFromLS();

    // Find the product in the cart
    const existingProduct = cartProducts.find((curProd) => curProd.id === id);

    // Set quantity and price based on existing product or defaults
    const quantity = existingProduct ? existingProduct.quantity : 1;
    const price = existingProduct ? existingProduct.price : defaultPrice;

    return { quantity, price };
};

// Function Usage:
// fetchQuantityFromCartLS(id, defaultPrice);
