document.addEventListener("DOMContentLoaded", () => {
    const config = window.APP_CONFIG;
    const cartModal = document.getElementById("cart-modal");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCountElements = document.querySelectorAll(".cart-count");
    const cartSubtotal = document.getElementById("cart-subtotal");
    const cartTotal = document.getElementById("cart-total");
    const closeCartButton = document.getElementById("close-cart");
    const checkoutButtons = document.querySelectorAll(".checkout-btn");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    initializeLinks();
    updateCart();

    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const id = button.dataset.id;
            const name = button.dataset.name;
            const price = Number.parseFloat(button.dataset.price);
            const img = button.dataset.img;

            const existingItem = cart.find((item) => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price, img, quantity: 1 });
            }

            saveCart();
            updateCart();
            openCart();
        });
    });

    cartItemsContainer?.addEventListener("click", (event) => {
        const button = event.target.closest("button");
        if (!button) {
            return;
        }

        const id = button.dataset.id;
        const item = cart.find((entry) => entry.id === id);

        if (button.classList.contains("minus")) {
            if (!item) {
                return;
            }
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart = cart.filter((entry) => entry.id !== id);
            }
        }

        if (button.classList.contains("plus") && item) {
            item.quantity += 1;
        }

        if (button.classList.contains("remove-item")) {
            cart = cart.filter((entry) => entry.id !== id);
        }

        saveCart();
        updateCart();
    });

    closeCartButton?.addEventListener("click", closeCart);

    checkoutButtons.forEach((button) => {
        button.addEventListener("click", () => {
            saveCart();
            window.location.href = config.routes.cart;
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeCart();
        }
    });

    function initializeLinks() {
        document.querySelectorAll("[data-route]").forEach((link) => {
            const routeKey = link.getAttribute("data-route");
            const route = config?.routes?.[routeKey];
            if (route) {
                link.setAttribute("href", route);
                const currentPage = window.location.pathname.split("/").pop() || config.routes.home;
                if (route === currentPage) {
                    link.classList.add("active");
                } else if (link.classList.contains("active")) {
                    link.classList.remove("active");
                }
            }
        });
    }

    function updateCart() {
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const total = subtotal === 0 ? 0 : subtotal + config.deliveryFee;

        cartCountElements.forEach((element) => {
            element.textContent = String(itemCount);
        });

        if (cartSubtotal) {
            cartSubtotal.textContent = formatCurrency(subtotal);
        }

        if (cartTotal) {
            cartTotal.textContent = formatCurrency(total);
        }

        if (!cartItemsContainer) {
            return;
        }

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            return;
        }

        cartItemsContainer.innerHTML = cart.map((item) => `
            <div class="cart-item">
                <div class="cart-item-img"><img src="${item.img}" alt="${item.name}"></div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">${formatCurrency(item.price)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}" aria-label="Decrease quantity">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `).join("");
    }

    function openCart() {
        if (!cartModal) {
            return;
        }
        cartModal.style.display = "block";
        window.requestAnimationFrame(() => {
            cartModal.classList.add("open");
        });
    }

    function closeCart() {
        if (!cartModal) {
            return;
        }
        cartModal.classList.remove("open");
        window.setTimeout(() => {
            if (!cartModal.classList.contains("open")) {
                cartModal.style.display = "none";
            }
        }, 300);
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function formatCurrency(value) {
        return `Rs ${Number(value).toFixed(2)}`;
    }
});
