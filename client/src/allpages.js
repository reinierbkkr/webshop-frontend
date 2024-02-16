function updateShoppingBasketBadge(){
    const nOfItems = Object.keys(getShoppingBasket()).length;
    document.getElementsByClassName("badge")[0].innerHTML = nOfItems;
}


function getShoppingBasket(){
    const cartItemsJson = localStorage.getItem("cartItems");
    if (cartItemsJson) {
        return JSON.parse(cartItemsJson);
    } else {
        return {};
    }
}

function cartItemsToLocalStorage(updatedCartItems) {
    let cartItemsJson = JSON.stringify(updatedCartItems);
    localStorage.setItem("cartItems", cartItemsJson);
}

function calculatePrice(adultTickets, kidsTickets, minNOfAdults, minNOfKids, adultPrice, kidsPrice, discount) {
    let discountTickets = 0;
    if (minNOfKids === 0) { discountTickets = Math.floor(adultTickets / minNOfAdults); }
    else if (minNOfAdults === 0) { discountTickets = Math.floor(kidsTickets / minNOfKids); }
    else { discountTickets = Math.floor(Math.min(adultTickets / minNOfAdults, kidsTickets / minNOfKids)); }

    const totalDiscountTickets = discountTickets * (adultPrice * minNOfAdults + kidsPrice * minNOfKids) * (1 - discount / 100);
    const totalRemainingAdultTickets = (adultTickets - discountTickets * minNOfAdults) * adultPrice;
    const totalRemainingKidsTickets = (kidsTickets - discountTickets * minNOfKids) * kidsPrice;
    const totalPrice = totalDiscountTickets + totalRemainingAdultTickets + totalRemainingKidsTickets;

    return totalPrice;
}

function makePriceString(totalPrice) {
    const priceString = totalPrice % 1 == 0
        ? totalPrice.toString() + ",-"
        : totalPrice.toFixed(2).replace('.', ',').toString();
    return priceString;
}

function fetchAttractionsAndDo(func){
    fetch("api/attractions")
        .then(response => response.json())
        .then(data => func(data))        
}

updateShoppingBasketBadge();
