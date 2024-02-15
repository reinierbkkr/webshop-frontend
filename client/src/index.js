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
    fetch("api/attractions")
        .then(response => response.json())
        .then(data => makePage(data))

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

