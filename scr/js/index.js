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