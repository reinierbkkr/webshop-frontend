function getShoppingBasket(){
    const cartItemsJson = localStorage.getItem("cartItems");
    if (cartItemsJson) {
        return JSON.parse(cartItemsJson);
    } else {
        return [];
    }
}

function updateShoppingBasketBadge(){
    const nOfItems = getShoppingBasket().length;
    document.getElementsByClassName("badge")[0].innerHTML = nOfItems;
}

updateShoppingBasketBadge();

const shoppingBasket = getShoppingBasket();

const template = document.getElementsByTagName("template")

console.log(template)

shoppingBasket.forEach(order => {
    let orderElement = template;
    // orderElement.namedItem("parkname").innerText = "hello";

    // console.log(parkname)
    
    document.getElementById("orders").innerHTML += orderElement.ticket.innerHTML;
});