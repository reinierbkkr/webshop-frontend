function finalizePaymentClicked(event){
    order = getShoppingBasket()
    placeOrder(order);
}

function placeOrder(order){
    fetch("/api/placeorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    })
        .then(function (response) {
            if (response.ok) {
                emptyShoppingBasket();
                location.href = "orderplaced.html";
            } else {
                console.log("failure: " + response.status + " " + response.statusText)
            }
        })
}

function fetchAvailableTicketsAndActivateButton(){
    fetchAttractionsAndDo(attractions => {
        let makeEventListener = true;
        for (var parkName in shoppingBasket) {
            attractions.forEach(attraction => {
                if (attraction.name.toUpperCase() === parkName && 
                    shoppingBasket[parkName].nOfAdults+shoppingBasket[parkName].nOfKids > attraction.available){
                    console.log(attraction.name)
                    console.log(attraction.available)
                    makeEventListener = false;
                }
            })
        }
        if (makeEventListener){
            document.querySelector("#finalizepaymentbutton").addEventListener("click", finalizePaymentClicked); // THIS
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

    cartItemsToLocalStorage(updatedCartItems);

    location.reload()
}

function addCartItemsToPage(shoppingBasket) {
    for (let parkName in shoppingBasket) {
        const template = document.querySelector("template#ticket");
        let orderElement = template.content.cloneNode(true);
        let details = orderElement.querySelectorAll(".details");
        let nOfAdults = shoppingBasket[parkName].nOfAdults
        let nOfKids = shoppingBasket[parkName].nOfKids

        details[0].innerText = parkName;
        details[1].innerText = nOfAdults;
        details[2].innerText = nOfKids;

        fetchAttractionDataAndUpdatePrice(parkName, nOfAdults, nOfKids, orderElement);

        // orderElement.querySelector("#cancelorderbutton").addEventListener("click", cancelOrderClicked);

        // document.querySelector("#orders").appendChild(orderElement);
    }
}

function fetchAttractionDataAndUpdatePrice(parkName, nOfAdults, nOfKids, orderElement){
    fetchAttractionsAndDo(attractions => {
        let currentAttraction = getDataForParkName(attractions, parkName);
        const adultPrice = currentAttraction.adultPrice
        const kidsPrice = currentAttraction.kidsPrice
        const minNOfAdults = currentAttraction.minimumNumberOfAdults
        const minNOfKids = currentAttraction.minimumNumberOfKids
        const discount = currentAttraction.discount
        
        price = calculatePrice(nOfAdults, nOfKids, minNOfAdults, minNOfKids, adultPrice, kidsPrice, discount)
        
        console.log(orderElement.querySelector(".price").innerText)
        orderElement.querySelector(".price").innerText = price
        // orderElement.querySelector(".details").

        orderElement.querySelector("#cancelorderbutton").addEventListener("click", cancelOrderClicked);
        document.querySelector("#orders").appendChild(orderElement);

        })

}

function getDataForParkName(attractions, parkName) {
    let currentAttraction
    attractions.forEach(attraction => {
        if (attraction.name.toUpperCase() === parkName) {
            currentAttraction = attraction;
        }
    });
    return currentAttraction;
}


const shoppingBasket = getShoppingBasket();

if (shoppingBasket && !(Object.keys(shoppingBasket).length === 0)){
    addCartItemsToPage(shoppingBasket);

    const template = document.querySelector("template#finalize")
    let element = template.content.cloneNode(true);
    document.querySelector("#finalize").appendChild(element);

    fetchAvailableTicketsAndActivateButton();

} else {
    document.querySelector("#finalize").innerText="Your shopping basket is empty";
}




