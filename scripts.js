document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const products = document.querySelectorAll('.product');
    const cartItems = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total');
    const cartCount = document.getElementById('cart-count');
    const locationInfo = document.getElementById('location-info');

    // Fetch user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        locationInfo.innerText = "Geolocation is not supported by this browser.";
    }

    function showPosition(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        locationInfo.innerText = `Lat: ${lat}, Lon: ${lon}`;
    }

    function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                locationInfo.innerText = "Request denied";
                break;
            case error.POSITION_UNAVAILABLE:
                locationInfo.innerText = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                locationInfo.innerText = "The request to get user location timed out.";
                break;
            case error.UNKNOWN_ERROR:
                locationInfo.innerText = "An unknown error occurred.";
                break;
        }
    }

    products.forEach(product => {
        product.querySelector('.add-to-cart').addEventListener('click', () => {
            const id = product.getAttribute('data-id');
            const name = product.querySelector('h3').innerText;
            const price = parseFloat(product.getAttribute('data-price'));
            addToCart({ id, name, price });
        });
    });

    document.getElementById('search-btn').addEventListener('click', () => {
        const query = document.getElementById('search').value.toLowerCase();
        products.forEach(product => {
            const name = product.querySelector('h3').innerText.toLowerCase();
            product.style.display = name.includes(query) ? '' : 'none';
        });
    });

    function addToCart(product) {
        cart.push(product);
        updateCartDisplay();
    }

    function updateCartDisplay() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            total += item.price;
            const li = document.createElement('li');
            li.innerText = `${item.name} - ${item.price.toFixed(2)}`;
            cartItems.appendChild(li);
        });
        totalDisplay.innerText = total.toFixed(2);
        cartCount.innerText = cart.length;
    }

    document.getElementById('checkout').addEventListener('click', () => {
        alert('Checkout - Total: Rs.' + totalDisplay.innerText);
        cart.length = 0;
        updateCartDisplay();
    });
});
