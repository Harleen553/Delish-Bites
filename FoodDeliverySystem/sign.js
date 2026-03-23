document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    const statusMessage = document.getElementById("signup-status");
    const submitButton = signupForm?.querySelector('button[type="submit"]');
    const apiBaseUrl = window.APP_CONFIG?.apiBaseUrl || "http://localhost:8080";

    initializeLinks();

    signupForm?.addEventListener("submit", async (event) => {
        event.preventDefault();

        const userData = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value.trim()
        };

        if (!userData.name || !userData.email || !userData.password) {
            renderStatus("Please fill in all fields.", true);
            return;
        }

        if (userData.password.length < 8) {
            renderStatus("Password must be at least 8 characters long.", true);
            return;
        }

        try {
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Signing Up...";
            }

            renderStatus("Creating account...", false);

            const response = await fetch(`${apiBaseUrl}/api/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data.message || "Registration failed.");
            }

            renderStatus(`User registered successfully: ${data.name}`, false);
            signupForm.reset();
            window.setTimeout(() => {
                window.location.href = window.APP_CONFIG.routes.home;
            }, 700);
        } catch (error) {
            console.error("Error:", error);
            renderStatus(error.message || "Registration failed. Please try again.", true);
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Sign Up";
            }
        }
    });

    function renderStatus(message, isError) {
        if (!statusMessage) {
            return;
        }
        statusMessage.textContent = message;
        statusMessage.style.color = isError ? "#b00020" : "#2e7d32";
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
