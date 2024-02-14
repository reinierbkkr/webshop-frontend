function orderButtonClicked(event){
    const button = event.target;
    const article = button.parentNode.parentNode;
    const eventName = article.querySelector(".parkname").innerText;
    const nOfKids = Number(article.querySelector(".numberofadults").value);
    const nOfAdults = Number(article.querySelector(".numberofkids").value);

    saveOrderInShoppingBasket(eventName, nOfKids, nOfAdults)

    updateShoppingBasketBadge();

}

function saveOrderInShoppingBasket(parkName, nOfKids, nOfAdults){

    const order = {
        parkName: parkName,
        nOfKids: nOfKids,
        nOfAdults: nOfAdults
    }

    let cartItems = getShoppingBasket();
    cartItems.push(order);

    let cartItemsJson = JSON.stringify(cartItems);

    localStorage.setItem("cartItems", cartItemsJson);

}


const buttons = document.querySelectorAll("button.orderbutton");

buttons.forEach(button => {
    button.addEventListener("click", orderButtonClicked);
});