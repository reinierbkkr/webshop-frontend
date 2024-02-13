function orderButtonClicked(event){
    const button = event.target;
    const article = button.parentNode.parentNode;
    const eventName = article.querySelector(".parkname").textContent;

    console.log(eventName)
}

const buttons = document.querySelectorAll("button.orderbutton");

buttons.forEach(button => {
    button.addEventListener("click", orderButtonClicked);
});