const cartvalue = document.querySelector("#cartValue")

export const updateCartValue = (cartProducts) => {
    return (cartvalue.innerHTML = ` <i class="fa-solid fa-cart-shopping"> ${cartProducts.length} </i>`)
}