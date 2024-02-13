function orderButtonClicked(event){
    const button = event.target;
    const article = button.parentNode.parentNode;
    const eventName = article.querySelector(".parkname").innerText;
    const nOfKids = Number(article.querySelector(".numberofadults").value);
    const nOfAdults = Number(article.querySelector(".numberofkids").value);
    console.log(eventName)
    console.log(nOfKids)
    console.log(nOfAdults)


}

const buttons = document.querySelectorAll("button.orderbutton");

buttons.forEach(button => {
    button.addEventListener("click", orderButtonClicked);
});