function orderButtonClicked(event){
    const button = event.target;
    const article = button.parentNode.parentNode;
    const eventName = article.querySelector(".parkname").innerText;
    const nOfKids = Number(article.querySelector(".numberofadults").value);
    const nOfAdults = Number(article.querySelector(".numberofkids").value);

    const nOfTickets = nOfAdults + nOfKids
    fetchEventInfoAndDoSomething(attractions => {
        attractions.forEach(attraction =>{
            console.log(attraction)
            console.log(eventName)
            if (eventName === attraction.name.toUpperCase() && nOfTickets <= attraction.available){
                saveOrderInShoppingBasket(eventName, nOfKids, nOfAdults)
                updateShoppingBasketBadge();
            } else {
                // do something to notify not enough tickets are available
            }
        });

    })


}

function saveOrderInShoppingBasket(parkName, nOfKids, nOfAdults){

    let cartItems = getShoppingBasket();
    if (!cartItems[parkName]){
        cartItems[parkName] = {
            nOfKids: nOfKids,
            nOfAdults: nOfAdults
        };
    } else {
        cartItems[parkName].nOfKids += nOfKids;
        cartItems[parkName].nOfAdults += nOfAdults;
    }

    let cartItemsJson = JSON.stringify(cartItems);

    localStorage.setItem("cartItems", cartItemsJson);

}

function fetchAttractionsAndMakePage() {
    fetchEventInfoAndDoSomething(makePage)
}



function makePage(attractionData){
    const template = document.querySelector("template")
    attractionData.forEach(attraction => {
        let attractionElement = template.content.cloneNode(true)

        attractionElement.querySelector(".parkname").innerText = attraction.name
        attractionElement.querySelectorAll(".price")[0].innerText = attraction.adultPrice
        attractionElement.querySelectorAll(".price")[1].innerText = attraction.kidsPrice
        attractionElement.querySelector(".adults").innerText = attraction.minimumNumberOfKids
        attractionElement.querySelector(".child").innerText = attraction.minimumNumberOfAdults
        attractionElement.querySelector(".percentage").innerText = attraction.discount

        attractionElement.querySelector(".orderbutton").addEventListener("click", orderButtonClicked);

        document.querySelector("main").appendChild(attractionElement);
    });

    
}

fetchAttractionsAndMakePage()

