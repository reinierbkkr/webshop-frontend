function updateShoppingBasketBadge(){
    const nOfItems = getShoppingBasket().length;
    document.getElementsByClassName("badge")[0].innerHTML = nOfItems;
}


function getShoppingBasket(){
    const cartItemsJson = localStorage.getItem("cartItems");
    if (cartItemsJson) {
        return JSON.parse(cartItemsJson);
    } else {
        return [];
    }
}

updateShoppingBasketBadge();
