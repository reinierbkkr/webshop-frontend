function orderButtonClicked(event){
    const button = event.target;
    const article = button.parentNode.parentNode;
    const eventName = article.querySelector(".parkname").innerText;
    const nOfKids = Number(article.querySelector(".numberofadults").value);
    const nOfAdults = Number(article.querySelector(".numberofkids").value);

    saveOrderInShoppingBasket(eventName, nOfKids, nOfAdults)

}

function saveOrderInShoppingBasket(eventName, nOfKids, nOfAdults){

    const order = {
        eventName: eventName,
        nOfKids: nOfKids,
        nOfAdults: nOfAdults
    }

    let cartItems = getShoppingBasket();
    console.log(cartItems);
    cartItems.push(order);

    let cartItemsJson = JSON.stringify(cartItems);

    localStorage.setItem("abc", cartItemsJson);




    
}

function getShoppingBasket(){
    const cartItemsJson = localStorage.getItem("abc");
    if (cartItemsJson) {
        return JSON.parse(cartItemsJson);
    } else {
        return [];
    }
}




const buttons = document.querySelectorAll("button.orderbutton");

buttons.forEach(button => {
    button.addEventListener("click", orderButtonClicked);
});