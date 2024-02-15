function finalizePaymentClicked(event){
    placeOrder(shoppingBasket);
    // emptyShoppingBasket();
}

function placeOrder(order){
    fetch("/api/placeorder", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    })
        .then(function (response) {
            if (response.ok) {
                // emptyShoppingBasket();
                location.href = "orderplaced.html";
                // console.log("success")}
            else {console.log("failure: " + response.status + " " + response.statusText)}
        })
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

shoppingBasket.forEach(order => {
    const template = document.querySelector("#ticket")
    let orderElement = template.content.cloneNode(true)
    let details = orderElement.querySelectorAll(".details")

    details[0].innerText = order.parkName
    details[1].innerText = order.nOfAdults
    details[2].innerText = order.nOfKids

    orderElement.querySelector("#cancelorderbutton").addEventListener("click", cancelOrderClicked);

    document.querySelector("#orders").appendChild(orderElement);
});

document.querySelector("#finalizepaymentbutton").addEventListener("click", finalizePaymentClicked);




