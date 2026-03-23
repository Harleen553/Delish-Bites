window.APP_CONFIG = Object.freeze({
    routes: {
        home: "index.html",
        about: "home.html",
        menu: "menu.html",
        signup: "sign.html",
        cart: "cart.html"
    },
    apiBaseUrl: `${window.location.protocol}//${window.location.hostname}:8080`,
    deliveryFee: 30
});
