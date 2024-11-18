import { getCartProductFromLS } from "./getCartProducts";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

// Fetch initial cart data from localStorage
getCartProductFromLS();

// Function to add a product to the cart
export const addToCart = (event, id, stock) => {
    // Retrieve the cart data from localStorage
    let arrLocalStorageProduct = getCartProductFromLS();

    // Get the current product element
    const currentProdElem = document.querySelector(`#card${id}`);
    if (!currentProdElem) {
        console.error(`Product element with ID "card${id}" not found.`);
        return;
    }

    // Extract quantity and price details
    let quantity = currentProdElem.querySelector(".productQuantity")?.innerText || "0";
    let price = currentProdElem.querySelector(".productPrice")?.innerText || "0";

    // Sanitize quantity and price
    quantity = Number(quantity);
    price = Number(price.replace("₹", "").trim());

    if (isNaN(quantity) || isNaN(price)) {
        console.error("Invalid quantity or price for product:", { id, quantity, price });
        return;
    }

    // Check if the product already exists in the cart
    let existingProd = arrLocalStorageProduct.find((curProd) => curProd.id === id);

    if (existingProd) {
        if (quantity > 1) {
            // Update the existing product's quantity and price
            quantity += Number(existingProd.quantity);
            price *= quantity;

            arrLocalStorageProduct = arrLocalStorageProduct.map((curProd) =>
                curProd.id === id ? { id, quantity, price } : curProd
            );

            // Save the updated cart data to localStorage
            localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));

            // Show a toast notification for adding to the cart
            showToast("add", id);

            // Update the cart button value
            updateCartValue(arrLocalStorageProduct);
        } else {
            console.warn("Duplicate product. Already exists in the cart.");
        }
        return;
    }

    // Add the new product to the cart
    arrLocalStorageProduct.push({ id, quantity, price });
    localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));

    // Update the cart button value
    updateCartValue(arrLocalStorageProduct);

    // Show a toast notification for adding to the cart
    showToast("add", id);
};
