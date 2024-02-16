function inputChanged(event){
    updatePrice(event.target)
}

function updatePrice(field){
    const parent = field.parentNode
    const adultPrice = Number(parent.querySelector(".adultprice .price").innerText);
    const kidsPrice = Number(parent.querySelector(".kidsprice .price").innerText);
    const minNOfAdults = Number(parent.querySelector(".discountrequirement .adults").innerText);
    const minNOfKids = Number(parent.querySelector(".discountrequirement .child").innerText);
    const discount = Number(parent.querySelector(".discountrequirement .percentage").innerText);
    const adultTickets = Number(parent.querySelector(".numberofadults").value);
    const kidsTickets = Number(parent.querySelector(".numberofkids").value);

    const price = calculatePrice(adultTickets, kidsTickets, minNOfAdults, minNOfKids, adultPrice, kidsPrice, discount);
    const priceString = makePriceString(price)
                                    
    parent.querySelector(".total .price").innerText = priceString;
}

function orderButtonClicked(event){
    const button = event.target;
    const article = button.parentNode.parentNode;
    const parkName = article.querySelector(".parkname").innerText;
    const nOfKids = Number(article.querySelector(".numberofkids").value);
    const nOfAdults = Number(article.querySelector(".numberofadults").value);

    fetchAttractionsAndDo(attractions => {
        const attraction = getDataForParkName(attractions, parkName)
        addToBasketIfPossible(nOfAdults, nOfKids, attraction);
        
    })
}

function addToBasketIfPossible(nOfAdults, nOfKids, attraction) {
    const nOfTickets = nOfAdults + nOfKids;
    const parkName = attraction.name.toUpperCase()
    if (    nOfTickets > 0 &&
            nOfTickets + getNOfTicketsInBasket(parkName) <= attraction.available) {
        saveOrderInShoppingBasket(parkName, nOfKids, nOfAdults);
        updateShoppingBasketBadge();
    } else {
        // do something to notify not enough tickets are available
    }
}

function getNOfTicketsInBasket(parkName){
    let cartItems = getShoppingBasket();
    if (cartItems[parkName]){
        return cartItems[parkName].nOfAdults + cartItems[parkName].nOfKids
    }
    return 0;
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

    cartItemsToLocalStorage(cartItems);

}

function fetchAttractionsAndMakePage() {
    fetchAttractionsAndDo(makePage)
}

function makePage(attractionData){
    const template = document.querySelector("template")
    attractionData.forEach(attraction => {
        let attractionElement = template.content.cloneNode(true)

        attractionElement.querySelector(".parkname").innerText = attraction.name
        attractionElement.querySelectorAll(".price")[0].innerText = attraction.adultPrice
        attractionElement.querySelectorAll(".price")[1].innerText = attraction.kidsPrice
        attractionElement.querySelector(".adults").innerText = attraction.minimumNumberOfAdults
        attractionElement.querySelector(".child").innerText = attraction.minimumNumberOfKids
        attractionElement.querySelector(".percentage").innerText = attraction.discount

        attractionElement.querySelector(".orderbutton").addEventListener("click", orderButtonClicked);
        attractionElement.querySelectorAll("input")[0].addEventListener("change", inputChanged);
        attractionElement.querySelectorAll("input")[1].addEventListener("change", inputChanged);

        document.querySelector("main").appendChild(attractionElement);
    });

}

fetchAttractionsAndMakePage()

