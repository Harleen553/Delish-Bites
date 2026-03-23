# Food Delivery App

This project is a full-stack food delivery application built with:

- Java 17 and Spring Boot for the backend
- MySQL for the database
- HTML, CSS, and JavaScript for the frontend

## What Was Fixed

The project has been cleaned up to address the main wiring and reliability issues:

- backend credentials are now loaded from `food-delivery/.env`
- frontend API access is dynamic and based on the current host instead of a hardcoded backend URL
- internal page navigation is driven through a shared route config instead of repeated hardcoded links
- user registration now validates input, blocks duplicate emails, and avoids returning passwords
- user passwords are stored as BCrypt hashes
- CORS supports common local frontend ports
- several broken text-encoding issues in the UI were corrected
- cart totals and cart modal behavior were made more consistent
- stale project information was updated

## Project Structure

- `index.html` home page
- `home.html` about page
- `menu.html` food menu
- `cart.html` cart and checkout page
- `sign.html` signup page
- `site-config.js` shared route and API configuration
- `food-delivery/` Spring Boot backend

## Backend Setup

The backend reads database settings from:

- `food-delivery/.env`

Use `food-delivery/.env.example` as the safe template.

## Run The Backend

```powershell
cd C:\Users\Harleenk\OneDrive\Desktop\Food\MD_2\FoodDeliverySystem\food-delivery
.\mvnw.cmd spring-boot:run
```

## Run The Frontend

```powershell
cd C:\Users\Harleenk\OneDrive\Desktop\Food\MD_2\FoodDeliverySystem
jwebserver -p 5500 -d .
```

Open:

- Frontend: `http://127.0.0.1:5500/index.html`
- Backend API: `http://localhost:8080/api/foods`

## Notes

- MySQL database name: `fooddelivery`
- signup endpoint: `POST /api/users/register`
- food listing endpoint: `GET /api/foods`
