document.addEventListener('DOMContentLoaded', function () {
    // 1. RBAC Initialization
    const navMenu = document.querySelector('nav ul');
    if (navMenu) {
        const userRole = localStorage.getItem('user_role');
        const userName = localStorage.getItem('user_name');
        
        let authHtml = '';
        let cartHtml = '';

        if (userRole === 'ADMIN') {
            // Admin Navbar
            authHtml = `
                <li><a href="admin.html" class="cart-icon">
                    <i class="fas fa-user-shield"></i> Admin Panel
                </a></li>
                <li><a href="#" id="logout-btn" class="cart-icon">Log Out</a></li>
            `;
            // No cart for admin
        } else if (userRole === 'USER') {
            // Logged in User Navbar
            authHtml = `
                <li><span style="color:#ff6b6b; margin-right:15px; font-weight:600;"><i class="fas fa-user"></i> ${userName}</span></li>
                <li><a href="#" id="logout-btn" class="cart-icon">Log Out</a></li>
            `;
            cartHtml = `
                <li id="nav-cart-item">
                    <a href="cart.html" class="cart-icon" id="cart-icon">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart-count" id="cart-count">0</span>
                    </a>
                </li>
            `;
        } else {
            // Guest Navbar
            authHtml = `
                <li><a href="sign.html" class="cart-icon">
                    <i class="fas fa-sign-in-alt"></i> Login / Sign Up
                </a></li>
            `;
            cartHtml = `
                <li id="nav-cart-item">
                    <a href="cart.html" class="cart-icon" id="cart-icon">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart-count" id="cart-count">0</span>
                    </a>
                </li>
            `;
        }

        // We assume the first 3 items are Home, About Us, Menu. We rebuild the ul carefully.
        const homeLink = `<li><a href="index.html">Home</a></li>`;
        const aboutLink = `<li><a href="home.html">About Us</a></li>`;
        const menuLink = `<li><a href="menu.html">Menu</a></li>`;

        navMenu.innerHTML = homeLink + aboutLink + menuLink + authHtml + cartHtml;

        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.clear();
                window.location.reload();
            });
        }
    }


    // 2. Cart Logic
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    updateCartUI();

    if (addToCartButtons) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Check if user is logged in
                if (!localStorage.getItem('user_id') && localStorage.getItem('user_role') !== 'USER') {
                    alert('Please Log In to add items to your cart.');
                    window.location.href = 'sign.html';
                    return;
                }

                const id = button.getAttribute('data-id');
                const name = button.getAttribute('data-name');
                const price = parseFloat(button.getAttribute('data-price'));
                const img = button.getAttribute('data-img');

                const existingItem = cart.find(item => item.id === id);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({ id, name, price, img, quantity: 1 });
                }

                saveCart();
                updateCartUI();
                
                // Optional: Show a quick feedback toast
                button.innerHTML = "Added!";
                button.style.backgroundColor = "#4caf50";
                setTimeout(() => {
                    button.innerHTML = "Add to Cart";
                    button.style.backgroundColor = "";
                }, 1000);
            });
        });
    }

    function updateCartUI() {
        if (cartCount) {
            cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        }

        if (!cartItemsContainer) return; // Only process if on a page with a cart modal/section

        cartItemsContainer.innerHTML = '';
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-img"><img src="${item.img}" alt="${item.name}"></div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">₹${item.price.toFixed(2)}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus" data-id="${item.id}">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        </div>
                        <button class="remove-item" data-id="${item.id}">Remove</button>
                    </div>
                </div>`;
        });

        if (cartSubtotal) cartSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
        if (cartTotal) cartTotal.textContent = `₹${(subtotal + 30).toFixed(2)}`; // ₹30 delivery fee

        document.querySelectorAll('.quantity-btn.minus').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const item = cart.find(i => i.id === id);
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    cart = cart.filter(i => i.id !== id);
                }
                saveCart();
                updateCartUI();
            });
        });

        document.querySelectorAll('.quantity-btn.plus').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const item = cart.find(i => i.id === id);
                item.quantity += 1;
                saveCart();
                updateCartUI();
            });
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => {
                cart = cart.filter(i => i.id !== button.getAttribute('data-id'));
                saveCart();
                updateCartUI();
            });
        });
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
});
