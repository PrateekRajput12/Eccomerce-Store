import products from "./api/products.json";
import { fetchQuantityFromCartLS } from "./fetchQuantityFromCartLS";
import { getCartProductFromLS } from "./getCartProducts";
import { incrementDecrement } from "./incrementDecrement";
import { removeProdFromCart } from "./removeProdFromCart";
import { updateCartProductTotal } from "./updateCartProductTotal";

let cartProducts = getCartProductFromLS();

// Filter products to only include those present in the cart
let filterProducts = products.filter((curProd) =>
    cartProducts.some((curElem) => curElem.id === curProd.id)
);

console.log("Filtered Products: ", filterProducts);

// -----------------------------------------------------
// to update the addToCart page
// --------------------------------------------------------

const cartElement = document.querySelector("#productCartContainer");
const templateContainer = document.querySelector("#productCartTemplate");

const showCartProduct = () => {
    if (!filterProducts.length) {
        cartElement.innerHTML = "<p>No products in your cart.</p>";
        return;
    }

    // Create a fragment to append all cart products at once (improves performance)
    const fragment = document.createDocumentFragment();

    filterProducts.forEach((curProd) => {
        const { category, id, image, name, stock, price } = curProd;

        let productClone = document.importNode(templateContainer.content, true);

        // Fetch quantity and price from localStorage
        const { quantity, price: storedPrice } = fetchQuantityFromCartLS(id, price);

        productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
        productClone.querySelector(".category").textContent = category;
        productClone.querySelector(".productName").textContent = name;
        productClone.querySelector(".productImage").src = image;
        productClone.querySelector(".productImage").alt = name;

        // Set the quantity and price for the cart item
        productClone.querySelector(".productQuantity").textContent = quantity;
        productClone.querySelector(".productPrice").textContent = `₹${storedPrice.toFixed(2)}`;

        // Handle increment and decrement button events
        productClone.querySelector(".stockElement").addEventListener("click", (event) => {
            incrementDecrement(event, id, stock, price);
        });

        // Handle removal of product from cart
        productClone.querySelector(".remove-to-cart-button").addEventListener("click", () => {
            removeProdFromCart(id);
        });

        // Append the product clone to the fragment
        fragment.appendChild(productClone);
    });

    // Append all product clones to the cart container at once
    cartElement.appendChild(fragment);
};

// -----------------------------------------------------
// Showing the cartProducts
// --------------------------------------------------------
showCartProduct();

// -----------------------------------------------------
// calculating the cart total
// --------------------------------------------------------
updateCartProductTotal();
