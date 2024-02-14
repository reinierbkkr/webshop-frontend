function finalizePaymentClicked(event){
    // do something
    emptyShoppingBasket();
}

function emptyShoppingBasket(){
    localStorage.removeItem("cartItems");
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

const button = document.querySelector("#finalizepaymentbutton").addEventListener("click", finalizePaymentClicked);
