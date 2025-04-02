const cardHolder = document.getElementById("cardHolder");
cardHolder.addEventListener("input", () => {
    cardHolder.value = cardHolder.value.replace(/[^a-zA-Z\s]/g, "").toUpperCase();
    validateForm();
});
const ccNumber = document.getElementById("cc-number");

ccNumber.addEventListener("input", () => {
    let value = ccNumber.value.replace(/\D/g, ""); 

    let cardType = "";
    if (/^3[47]/.test(value)) {
        cardType = "amex";
    } else if (/^4/.test(value)) {
        cardType = "visa";
    } else if (/^5[1-5]/.test(value)) {
        cardType = "mastercard";
    }

    if (cardType === "amex") {
        value = value.slice(0, 15);
        value = value.replace(/(\d{4})(\d{6})?(\d{5})?/, (_, p1, p2, p3) => 
            [p1, p2, p3].filter(Boolean).join(" ")
        );
    } else {
        value = value.slice(0, 16);
        value = value.replace(/(\d{4})/g, "$1 ").trim();
    }

    ccNumber.value = value;

    validateForm();
});

function luhnCheck(cardNumber) {
    const cleanNumber = cardNumber.replace(/\s/g, "");
    let sum = 0;
    let shouldDouble = false;

    for (let i = cleanNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanNumber[i], 10);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

const ccExpiration = document.getElementById("cc-expiration");
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;

ccExpiration.addEventListener("input", (e) => {
    let value = ccExpiration.value.replace(/\D/g, "");

    if (value.length > 6) value = value.slice(0, 6);

    if (value.length <= 2) {
        ccExpiration.value = value;
    } else {
        ccExpiration.value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }

    if (e.inputType === "deleteContentBackward" && ccExpiration.value.length === 3) {
        ccExpiration.value = ccExpiration.value.slice(0, 2);
    }

    let month = parseInt(value.slice(0, 2), 10);
    if (month > 12) {
        month = 12;
        ccExpiration.value = `12/${value.slice(2)}`;
    }

    let year = parseInt(value.slice(2), 10);
    if (value.length === 6 && year < currentYear) {
        year = currentYear;
        ccExpiration.value = `${month.toString().padStart(2, "0")}/${year}`;
    }

    if (year === currentYear && month < currentMonth) {
        month = currentMonth;
        ccExpiration.value = `${month.toString().padStart(2, "0")}/${year}`;
    }

    validateForm();
});

const ccCVV = document.getElementById("cc-cvv");
ccCVV.addEventListener("input", () => {
    ccCVV.value = ccCVV.value.replace(/\D/g, "").slice(0, 4);
    validateForm();
});

const btnPay = document.getElementById("submit");

function validateForm() {
    const isCardHolderValid = cardHolder.value.trim().length > 0;
    const isCardNumberValid = ccNumber.value.replace(/\s/g, "").length === 16 && luhnCheck(ccNumber.value);
    const isExpirationValid = /^\d{2}\/\d{4}$/.test(ccExpiration.value);
    const isCVVValid = ccCVV.value.length >= 3 && ccCVV.value.length <= 4;

    btnPay.disabled = !(isCardHolderValid && isCardNumberValid && isCVVValid);
}