document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const btnLogin = document.getElementById('btn-login');
    const btnSignup = document.getElementById('btn-signup');

    // Toggle Forms
    btnLogin.addEventListener('click', () => {
        btnLogin.classList.add('active');
        btnSignup.classList.remove('active');
        loginForm.classList.remove('hidden');
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
        signupForm.classList.add('hidden');
    });

    btnSignup.addEventListener('click', () => {
        btnSignup.classList.add('active');
        btnLogin.classList.remove('active');
        signupForm.classList.remove('hidden');
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
        loginForm.classList.add('hidden');
    });

    // Handle Login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();

        const loginData = { email, password };

        fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid email or password');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('user_id', data.id);
            localStorage.setItem('user_name', data.name);
            localStorage.setItem('user_role', data.role);
            
            // Redirect based on role or to home
            if (data.role === 'ADMIN') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'index.html';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Login failed: ' + error.message);
        });
    });

    // Handle Signup
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const role = document.getElementById('role').value;

        const userData = { name, email, password, role };

        fetch('http://localhost:8080/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to register user');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('user_id', data.id);
            localStorage.setItem('user_name', data.name);
            localStorage.setItem('user_role', data.role);
            
            if (data.role === 'ADMIN') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'index.html';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Registration failed. Please try again.');
        });
    });
});
