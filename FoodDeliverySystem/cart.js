document.addEventListener("DOMContentLoaded", () => {
    const cartItemsList = document.getElementById("cart-items-list");
    const cartSubtotal = document.getElementById("cart-subtotal");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
    const checkoutBtn = document.getElementById("checkout-btn");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    initializeLinks();
    displayCartItems();

    cartItemsList?.addEventListener("click", (event) => {
        const itemElement = event.target.closest(".cart-item");
        if (!itemElement) {
            return;
        }

        if (event.target.closest(".remove-item")) {
            const itemId = itemElement.dataset.id;
            cart = cart.filter((item) => item.id !== itemId);
            localStorage.setItem("cart", JSON.stringify(cart));
            displayCartItems();
        }
    });

    checkoutBtn?.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add items before checkout.");
            return;
        }

        const street = document.getElementById("street").value.trim();
        const city = document.getElementById("city").value.trim();
        const pin = document.getElementById("pin").value.trim();

        if (!street || !city || !pin) {
            alert("Please fill in all address fields before checkout.");
            return;
        }

        checkoutBtn.disabled = true;
        checkoutBtn.textContent = "Processing...";

        window.setTimeout(() => {
            alert("Order placed successfully! Thank you for your purchase.");
            cart = [];
            localStorage.setItem("cart", JSON.stringify(cart));
            displayCartItems();
            checkoutBtn.disabled = false;
            checkoutBtn.textContent = "Proceed to Checkout";

            document.getElementById("street").value = "";
            document.getElementById("city").value = "";
            document.getElementById("pin").value = "";
        }, 1000);
    });

    function displayCartItems() {
        if (cart.length === 0) {
            cartItemsList.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-basket"></i>
                    <p>Your cart is empty</p>
                    <a class="btn-primary" data-route="menu">Browse Menu</a>
                </div>
            `;
            initializeLinks();
            cartSubtotal.textContent = "Rs 0.00";
            cartTotal.textContent = "Rs 0.00";
            cartCount.textContent = "0";
            return;
        }

        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const total = subtotal + (window.APP_CONFIG?.deliveryFee || 30);

        cartItemsList.innerHTML = cart.map((item) => `
            <div class="cart-item" data-id="${item.id}">
                <div class="item-img">
                    <img src="${item.img}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-price">Rs ${Number(item.price).toFixed(2)} x ${item.quantity}</p>
                    <div class="item-actions">
                        <button class="remove-item"><i class="fas fa-trash"></i> Remove</button>
                    </div>
                </div>
            </div>
        `).join("");

        cartSubtotal.textContent = `Rs ${subtotal.toFixed(2)}`;
        cartTotal.textContent = `Rs ${total.toFixed(2)}`;
        cartCount.textContent = String(cart.reduce((count, item) => count + item.quantity, 0));
    }

    function initializeLinks() {
        document.querySelectorAll("[data-route]").forEach((link) => {
            const routeKey = link.getAttribute("data-route");
            const route = window.APP_CONFIG?.routes?.[routeKey];
            if (route) {
                link.setAttribute("href", route);
                const currentPage = window.location.pathname.split("/").pop() || window.APP_CONFIG.routes.home;
                if (route === currentPage) {
                    link.classList.add("active");
                } else if (link.classList.contains("active")) {
                    link.classList.remove("active");
                }
            }
        });
    }
});
