// Находим все кнопки "Buy now" на странице
const buyButtons = document.querySelectorAll('[data-test="product-order-button"]');

buyButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('[data-test="product-card"]');
        
        const productName = productCard.querySelector('.font-semibold').textContent.trim();
        
        const productPrice = productCard.querySelector('.font-extrabold span').textContent.trim();
        
        const selectedQuantity = localStorage.getItem('selectedQuantity') || '1'
        
        localStorage.setItem('productName', productName);
        localStorage.setItem('productPrice', productPrice);
        localStorage.setItem('productQuantity', selectedQuantity);
        
       // console.log('Сохранено в localStorage:');
       // console.log(`Название: ${productName}`);
       // console.log(`Цена: ${productPrice}`);
       // console.log(`Количество: ${selectedQuantity}`);

        window.location.href = '/pages/payment/Checkout.html';
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('[data-test="select"]');
    let selectedQuantity;

    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.relative.bg-white.w-full.py-3.px-4');
        const dropdownList = dropdown.querySelector('.w-full.z-20.border');
        const dropdownText = dropdownToggle.querySelector('p.text-gray-black');
        const dropdownItems = dropdownList.querySelectorAll('li[role="option"]');

        function toggleDropdown() {
            if (dropdownList.style.display === 'block') {
                dropdownList.style.display = 'none';
            } else {
                dropdownList.style.display = 'block';
            }
        }

        function selectQuantity(event) {
            const selectedValue = event.target.textContent.trim();
            dropdownText.textContent = selectedValue;
            dropdownList.style.display = 'none';
            selectedQuantity = selectedValue;
            localStorage.setItem('selectedQuantity', selectedValue);
        }

        dropdownToggle.addEventListener('click', toggleDropdown);
        dropdownItems.forEach(item => {
            item.addEventListener('click', selectQuantity);
        });

        document.addEventListener('click', function(event) {
            if (!dropdown.contains(event.target)) {
                dropdownList.style.display = 'none';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var notificationBar = document.querySelector('.bcpNotificationBar');
    var acceptButton = document.getElementById('bcAcceptAll');

    if (localStorage.getItem('cookiesAccepted') === 'true') {
        notificationBar.style.display = 'none';
    } else {
        acceptButton.addEventListener('click', function() {
            notificationBar.style.display = 'none';
            localStorage.setItem('cookiesAccepted', 'true');
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    localStorage.removeItem('productQuantity');
    const dropdown = document.querySelector('[data-test="select"]');
    const defaultQuantity = dropdown.querySelector('p.text-gray-black').textContent.trim();

    localStorage.setItem('productQuantity', defaultQuantity);
});
