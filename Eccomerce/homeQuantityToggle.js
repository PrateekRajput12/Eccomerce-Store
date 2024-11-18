export const homeQuantityToggle = (event, id, stock) => {
    // Select the current card element using the product ID
    const currentCardElement = document.querySelector(`#card${id}`);
    if (!currentCardElement) {
        console.error(`Card element with ID "card${id}" not found.`);
        return;
    }

    // Select the product quantity element
    const productQuantity = currentCardElement.querySelector(".productQuantity");
    if (!productQuantity) {
        console.error(`Product quantity element not found in card with ID "card${id}".`);
        return;
    }

    // Get the current quantity or default to 1
    let quantity = parseInt(productQuantity.getAttribute("data-quantity")) || 1;

    // Handle increment or decrement actions
    if (event.target.classList.contains("cartIncrement")) {
        if (quantity < stock) {
            quantity += 1;
        } else {
            console.warn("Maximum stock reached.");
        }
    } else if (event.target.classList.contains("cartDecrement")) {
        if (quantity > 1) {
            quantity -= 1;
        } else {
            console.warn("Minimum quantity is 1.");
        }
    }

    // Update the quantity in the UI and dataset
    productQuantity.innerText = quantity;
    productQuantity.setAttribute("data-quantity", quantity.toString());
    console.log(`Updated quantity for product ID ${id}: ${quantity}`);

    return quantity;
};
