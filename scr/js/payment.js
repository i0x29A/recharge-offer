const paymentItems = document.querySelectorAll('.flex.items-center.justify-between.hover\\:cursor-pointer.w-full.my-2');

const completePaymentHTML = `
  <div style="height: auto;">
    <div data-test="continue-to-cgpay">
      <button id="go-to-checkout" onClick="goToCheck ()" data-test="btn-complete-payment" class="mt-0 rounded font-bold text-center text-base leading-none inline-block hover:bg-cta-hover border-0 bg-cta text-black focus:shadow-border-sm transition-colors transition-shadow duration-300 px-8 py-4 cursor-pointer active:bounce active:border-solid truncate">
        Complete payment
      </button>
    </div>
  </div>
`;

let previousBorderLinkItem = null;

paymentItems.forEach(item => {
  item.addEventListener('click', function() {
    paymentItems.forEach(paymentItem => {
      const existingButton = paymentItem.querySelector('[data-test="continue-to-cgpay"]');
      if (existingButton) {
        existingButton.parentElement.remove();
      }

      const radioIndicator = paymentItem.querySelector('.rounded-full.border.border-gray.w-4.h-4.flex.items-center.justify-center');
      if (radioIndicator) {
        radioIndicator.classList.remove('bg-info-dark', 'border-none');
      }
    });

    if (previousBorderLinkItem && previousBorderLinkItem !== this) {
      const prevBorderContainer = previousBorderLinkItem.querySelector('.p-3.border.rounded.cursor-pointer');
      if (prevBorderContainer) {
        prevBorderContainer.classList.remove('border-link');
        prevBorderContainer.classList.add('border-gray');
      }
    }

    const label = this.querySelector('.flex.items-center.justify-between.h-full.cursor-pointer');
    const radioIndicator = this.querySelector('.rounded-full.border.border-gray.w-4.h-4.flex.items-center.justify-center');
    const borderContainer = this.querySelector('.p-3.border.rounded.cursor-pointer');

    if (radioIndicator) {
      radioIndicator.classList.add('bg-info-dark', 'border-none');
    }

    if (borderContainer) {
      borderContainer.classList.remove('border-gray');
      borderContainer.classList.add('border-link');
    }

    label.insertAdjacentHTML('afterend', completePaymentHTML);

    previousBorderLinkItem = this;
  });
});

document.getElementById('continue-to-payment').addEventListener('click', function() {
    const emailValue = document.getElementById('input-text-1').value;
    
    localStorage.setItem('userEmail', emailValue);
    
    const emailElement = document.getElementById('your-email');
    emailElement.textContent = emailValue;
    
    document.getElementById('email-show-form').style.display = 'none';
    
    document.getElementById('email-hide-form').style.display = 'block';

    document.getElementById('payment-method-hide').style.display = 'none';
    document.getElementById('payment-method-show').style.display = 'block';
});

document.addEventListener('DOMContentLoaded', (event) => {
    const productName = localStorage.getItem('productName');
    const productPrice = localStorage.getItem('productPrice');
    const productQuantity = localStorage.getItem('productQuantity') || '1';

    if (!productName || !productPrice) {
        document.body.style.backgroundColor = 'white';
        document.body.innerHTML = '';
        return;
    }

    const productNameElement = document.getElementById('productName');
    if (productNameElement) {
        productNameElement.textContent = productName;
    }

    const productElement = document.querySelector('[data-test="product"] span:first-child');

    const formattedProductName = `${productName} x${productQuantity}`;

    if (productElement) {
        productElement.textContent = formattedProductName;
    }

    const numericPrice = parseFloat(productPrice.replace(/[^0-9.-]+/g,""));

    const totalPrice = (numericPrice * parseInt(productQuantity)).toFixed(2);

    const totalPriceElement = document.querySelector('[data-test="total-price"]');
    if (totalPriceElement) {
        totalPriceElement.textContent = `AUD ${totalPrice}`;
        totalPriceElement.setAttribute('data-test-total-price', totalPrice);
    }

    const imageElement = document.getElementById('image-checkout');
    if (imageElement) {
        let imageSrc = '';
        if (productName.includes('Lycamobile')) {
            imageSrc = 'https://recommerce-static.recharge.com/media/cache/product_card/f5/a2/e0d9cc62ed49aaa86d4a2def9c19.png';
        } else if (productName.includes('Lebara')) {
            imageSrc = 'https://recommerce-static.recharge.com/media/cache/product_card/26/3e/d4f302b89343716fdfc360f48933.png';
        } else if (productName.includes('Vodafone')) {
            imageSrc = 'https://recommerce-static.recharge.com/media/cache/product_card/c8/e6/34ca114ebcb4e1b0bfb387623262.png';
        } else if (productName.includes('amaysim')) {
            imageSrc = 'https://recommerce-static.recharge.com/media/cache/product_card/ff/37/60caba3a680010bafd9c6522f2f1.png';
        } else if (productName.includes('Boost Mobile')) {
            imageSrc = 'https://recommerce-static.recharge.com/media/cache/product_card/98/10/359fe424f449339e3af6f5b2f2c0.png';
        } else {
            imageSrc = '';
        }
        
        imageElement.src = imageSrc;
        imageElement.setAttribute('data-src', imageSrc);
        imageElement.setAttribute('data-savepage-src', imageSrc);
    }

    document.body.style.backgroundColor = '';
});

document.getElementById('checkout-email').addEventListener('click', function(event) {
    event.preventDefault();
    
    document.getElementById('email-show-form').style.display = 'block';
    document.getElementById('email-hide-form').style.display = 'none';
    document.getElementById('payment-method-hide').style.display = 'block';
    document.getElementById('payment-method-show').style.display = 'none';
});


function goToCheck () {
    window.location.href = '/pages/payment/Enter.html';
}

const emailInput = document.getElementById('input-text-1');
const continueButton = document.getElementById('continue-to-payment');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function updateButtonState() {
    const email = emailInput.value.trim();
    const isValidEmail = emailRegex.test(email);

    if (isValidEmail) {
        continueButton.disabled = false;
        continueButton.classList.remove('bg-gray');
        continueButton.classList.add('bg-cta');
    } else {
        continueButton.disabled = true;
        continueButton.classList.remove('bg-cta');
        continueButton.classList.add('bg-gray');
    }
}

emailInput.addEventListener('input', updateButtonState);

updateButtonState();