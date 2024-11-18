export function showToast(operation, id) {
    const toast = document.createElement("div");
    toast.classList.add("toast");

    // Set the text content of the toast based on the operation
    if (operation === "add") {
        toast.textContent = `Product with ID ${id} has been added.`;
        toast.classList.add("toast--add");
    } else {
        toast.textContent = `Product with ID ${id} has been deleted.`;
        toast.classList.add("toast--delete");
    }

    // Append the toast to the body
    document.body.appendChild(toast);

    // Automatically remove the toast after a few seconds
    setTimeout(() => {
        toast.classList.add("toast--hide");
        // Wait for the fade-out effect to finish before removing the element
        setTimeout(() => {
            toast.remove();
        }, 500); // Timeout duration to match the fade-out effect
    }, 2000);
}
