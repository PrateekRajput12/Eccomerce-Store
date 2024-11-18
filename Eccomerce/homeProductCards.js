import { addToCart } from "./addToCart";
import { homeQuantityToggle } from "./homeQuantityToggle";

const productContainer = document.querySelector("#productContainer");
const productTemplate = document.querySelector("#productTemplate");

export const showProductContainer = (products) => {
    if (!products || products.length === 0) {
        console.warn("No products available to display.");
        return false;
    }

    products.forEach((curProd) => {
        const { id, category, name, image, stock, description, price } = curProd;

        // Clone the product template
        const productClone = document.importNode(productTemplate.content, true);

        // Set dynamic attributes and content
        const cardElement = productClone.querySelector("#cardValue");
        cardElement.setAttribute("id", `card${id}`);

        productClone.querySelector(".category").textContent = category;
        productClone.querySelector(".productName").textContent = name;
        productClone.querySelector(".productImage").src = image;
        productClone.querySelector(".productImage").alt = name;
        productClone.querySelector(".productStock").textContent = stock;
        productClone.querySelector(".productDescription").textContent = description;
        productClone.querySelector(".productPrice").textContent = `₹${price}`;
        productClone.querySelector(".productActualPrice").textContent = `₹${price * 4
            }`;

        // Attach event listeners
        productClone
            .querySelector(".stockElement")
            .addEventListener("click", (event) => homeQuantityToggle(event, id, stock));

        productClone
            .querySelector(".add-to-cart-button")
            .addEventListener("click", (event) => addToCart(event, id, stock));

        // Append the cloned product card to the container
        productContainer.appendChild(productClone);
    });

    return true; // Indicate successful rendering
};
