function updateShoppingBasketBadge(){
    const nOfItems = Object.keys(getShoppingBasket()).length;
    document.getElementsByClassName("badge")[0].innerHTML = nOfItems;
}


function getShoppingBasket(){
    const cartItemsJson = localStorage.getItem("cartItems");
    if (cartItemsJson) {
        return JSON.parse(cartItemsJson);
    } else {
        return {};
    }
}

function cartItemsToLocalStorage(updatedCartItems) {
    let cartItemsJson = JSON.stringify(updatedCartItems);
    localStorage.setItem("cartItems", cartItemsJson);
}

function fetchEventInfoAndDoSomething(func){
    fetch("api/attractions")
        .then(response => response.json())
        .then(data => func(data))        
}

updateShoppingBasketBadge();
