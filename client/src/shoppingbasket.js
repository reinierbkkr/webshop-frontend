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

const template = document.getElementById("ticket")

for (let i = 0; i < shoppingBasket.length; i++) {
    let orderElement = template;    
    document.getElementById("orders").innerHTML += orderElement.innerHTML;

    document.getElementsByClassName("details")[i*3].innerText = shoppingBasket[i].parkName
    document.getElementsByClassName("details")[i*3+1].innerText = shoppingBasket[i].nOfAdults
    document.getElementsByClassName("details")[i*3+2].innerText = shoppingBasket[i].nOfKids

}

document.querySelectorAll("#cancelorderbutton").forEach(button => {
    button.addEventListener("click", cancelOrderClicked);
});



document.querySelector("#finalizepaymentbutton").addEventListener("click", finalizePaymentClicked);
