function finalizePaymentClicked(event){
    // do something
    emptyShoppingBasket();
}

function emptyShoppingBasket(){
    localStorage.removeItem("cartItems");
    location.reload()
}

function cancelOrderClicked(event){
    const order = event.target.parentElement
    const parent = order.parentElement

    index = Array.prototype.indexOf.call(parent.children, order);

    removeOrderFromBasket(index);
}

function removeOrderFromBasket(index){
    let cartItems = getShoppingBasket();

    console.log(index)
    // let itemToBeRemoved = cartItems.indexOf(index);
    // console.log(itemToBeRemoved)

    cartItems.splice(index, 1);

    let cartItemsJson = JSON.stringify(cartItems);

    localStorage.setItem("cartItems", cartItemsJson);

    location.reload()
}



updateShoppingBasketBadge();

const shoppingBasket = getShoppingBasket();
const template = document.querySelector("#ticket")

shoppingBasket.forEach(order => {
    let orderElement = template.content.cloneNode(true)
    let details = orderElement.querySelectorAll(".details")

    details[0].innerText = order.parkName
    details[1].innerText = order.nOfAdults
    details[2].innerText = order.nOfKids

    orderElement.querySelector("#cancelorderbutton").addEventListener("click", cancelOrderClicked);

    document.querySelector("#orders").appendChild(orderElement);
});

document.querySelector("#finalizepaymentbutton").addEventListener("click", finalizePaymentClicked);
