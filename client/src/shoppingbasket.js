function finalizePaymentClicked(event){
    order = getShoppingBasket()
    placeOrder(order);
}

function placeOrder(order){
    fetch("/api/placeorder", {
        method: "POST",
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
            } else {
                console.log("failure: " + response.status + " " + response.statusText)
            }
        })
}

function fetchAvailableTicketsAndMakeButton(){
    fetchEventInfoAndDoSomething(attractions => {
        let makeEventListener = true;
        for (var parkName in shoppingBasket) {
            attractions.forEach(attraction => {
                if (attraction.name.toUpperCase() === parkName && attraction.available < 1){
                    console.log(attraction.name)
                    console.log(attraction.available)
                    makeEventListener = false;
                }
    
            })
        }
        if (makeEventListener){
            document.querySelector("#finalizepaymentbutton").addEventListener("click", finalizePaymentClicked);
        }
    })
}

function emptyShoppingBasket(){
    localStorage.removeItem("cartItems");

    location.reload()
}

function cancelOrderClicked(event){
    const parkName = event.target.parentElement.querySelectorAll(".details")[0].innerText
    removeOrderFromBasket(parkName)
}

function removeOrderFromBasket(targetParkName){
    let cartItems = getShoppingBasket();

    const { [targetParkName]: removedParkName, ...updatedCartItems } = cartItems;

    let cartItemsJson = JSON.stringify(updatedCartItems);
    localStorage.setItem("cartItems", cartItemsJson);

    location.reload()
}




const shoppingBasket = getShoppingBasket();

for (var parkName in shoppingBasket) {
    const template = document.querySelector("#ticket")
    let orderElement = template.content.cloneNode(true)
    let details = orderElement.querySelectorAll(".details")

    details[0].innerText = parkName
    details[1].innerText = shoppingBasket[parkName].nOfAdults
    details[2].innerText = shoppingBasket[parkName].nOfKids

    orderElement.querySelector("#cancelorderbutton").addEventListener("click", cancelOrderClicked);

    document.querySelector("#orders").appendChild(orderElement);
}

// document.querySelector("#finalizepaymentbutton").addEventListener("click", finalizePaymentClicked);

fetchAvailableTicketsAndMakeButton();




