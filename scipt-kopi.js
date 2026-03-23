// Hent kurv fra localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Gem kurv i localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Tilføj produkt til kurv
function addToCart(productName) {
    cart.push(productName);
    saveCart();
    alert(`${productName} tilføjet til kurven! 🛒`);
    updateCartCount();
}

// Opdater kurv antal i navigation
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const count = cart.length;
        cartCount.textContent = count > 0 ? `(${count})` : '';
    }
}

// Opdater kurv visning
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.className = 'kurv-empty';
        cartItems.innerHTML = 'Din kurv er tom. Tilføj nogle produkter! 🛒';
        checkoutBtn.classList.add('hidden');
    } else {
        cartItems.className = '';
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="kurv-item">
                <span><strong>${item}</strong></span>
                <button onclick="removeFromCart(${index})">Fjern</button>
            </div>
        `).join('');
        checkoutBtn.classList.remove('hidden');
    }
}

// Fjern produkt fra kurv
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
    updateCartCount();
}

// Tøm hele kurven
function clearCart() {
    if (confirm('Er du sikker på du vil tømme kurven?')) {
        cart = [];
        saveCart();
        updateCart();
        updateCartCount();
    }
}

// Gå til betaling
function goToCheckout() {
    alert('Betaling ikke implementeret endnu! 💳\n\nDine produkter:\n' + cart.join('\n'));
}

// Send kontakt besked
function sendMessage(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    alert(`Tak for din besked, ${name}! 🐼\n\nVi vender tilbage til ${email} hurtigst muligt.`);
    event.target.reset();
}

// Kør når siden loader
window.onload = function() {
    updateCartCount();
    updateCart();
};