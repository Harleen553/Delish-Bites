# Delish Bites Food Delivery App

Delish Bites is a full-stack food delivery web application built with a static frontend and a Java Spring Boot backend. The project lets users browse menu items, add items to a cart, register through the backend API, and place a simple checkout flow through the cart page.

### Team Members
- Harleen Kaur 
- Likitha Venugopal

## Project Overview

The application is split into two parts:

- Frontend: HTML, CSS, and JavaScript pages for browsing food, searching dishes, managing a cart, and signing up
- Backend: Spring Boot REST API connected to MySQL for storing users and food data

This project currently focuses on:

- food discovery through a multi-page interface
- local cart management using browser storage
- backend user registration
- backend food listing and food creation endpoints

## Features

### Frontend Features
- home page with hero section and featured menu items
- about page with service highlights and customer testimonials
- menu page with categorized dishes
- live search on the home and menu pages
- cart modal for quick cart review
- full cart page for order summary and address entry
- signup page connected to the Java backend
- shared dynamic route configuration through `site-config.js`

### Backend Features
- `GET /api/foods` to fetch all food items
- `POST /api/foods` to add a food item
- `POST /api/users/register` to register a user
- MySQL persistence using Spring Data JPA
- CORS support for common local frontend ports
- validation and duplicate email protection for signup
- BCrypt password hashing

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- Font Awesome

### Backend
- Java 17
- Spring Boot 3
- Spring Web
- Spring Data JPA
- Spring Security Crypto
- Maven

### Database
- MySQL

## Project Structure

```text
FoodDeliverySystem/
|-- index.html
|-- home.html
|-- menu.html
|-- cart.html
|-- sign.html
|-- styles.css
|-- home.css
|-- menu.css
|-- cart.css
|-- sign.css
|-- script.js
|-- cart.js
|-- sign.js
|-- search.js
|-- site-config.js
|-- images/
|-- launch.json
|-- README.md
|-- food-delivery/
|   |-- pom.xml
|   |-- .env
|   |-- .env.example
|   |-- src/main/java/com/fooddelivery/
|   |-- src/main/resources/application.properties
```

## Pages

### 1. `index.html`
- landing page of the website
- highlights food categories
- displays featured dishes
- includes a cart modal and search bar

### 2. `home.html`
- about and promotional page
- explains service benefits
- includes testimonials and featured dishes

### 3. `menu.html`
- main food browsing page
- grouped into fast food, Italian, non-veg, veg, and desserts
- includes search for menu filtering

### 4. `cart.html`
- full cart view
- shows selected items, subtotal, delivery fee, and total
- accepts delivery address inputs

### 5. `sign.html`
- user signup page
- sends registration data to the backend API

## Frontend Wiring

The frontend uses `site-config.js` to avoid scattering hardcoded page routes and API assumptions everywhere.

### Dynamic Items
- internal page links are mapped through `APP_CONFIG.routes`
- backend base URL is generated from the current browser location
- delivery fee is defined in one place through shared config

### Cart Flow
- items are stored in `localStorage`
- the cart badge updates across pages
- the cart modal allows quick review
- the modal checkout button sends the user to `cart.html`
- the cart page handles address validation before final confirmation

## Backend Wiring

The backend uses Spring Boot with controller-service-repository structure:

- `controller/`
  REST endpoints
- `service/`
  business logic
- `repository/`
  JPA database access
- `model/`
  entity classes
- `config/`
  CORS configuration

### Main Backend Classes
- `FoodController.java`
- `UserController.java`
- `FoodService.java`
- `UserService.java`
- `FoodRepository.java`
- `UserRepository.java`
- `Food.java`
- `User.java`
- `WebConfig.java`
- `ApiExceptionHandler.java`

## Database Configuration

The backend now reads sensitive values from environment-style configuration.

### Files
- `.env`
- `.env.example`

### Variables Used
- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `JPA_DDL_AUTO`
- `JPA_SHOW_SQL`
- `APP_CORS_ALLOWED_ORIGINS`

### Default Database
- database name: `fooddelivery`

## How to Run

### 1. Create the database

Run this once in MySQL if needed:

```sql
CREATE DATABASE fooddelivery;
```

### 2. Configure backend credentials

Edit:

`food-delivery/.env`

Example:

```env
DB_URL=jdbc:mysql://localhost:3306/fooddelivery
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
JPA_DDL_AUTO=update
JPA_SHOW_SQL=true
APP_CORS_ALLOWED_ORIGINS=http://127.0.0.1:5500,http://localhost:5500
```

### 3. Start the backend

```powershell
cd backend
mvn spring-boot:run
```

### 4. Start the frontend

```powershell
cd frontend
jwebserver -p 5500 -d .
```

### 5. Open the app

- Frontend: `http://127.0.0.1:5500/index.html`
- Backend API sample: `http://localhost:8080/api/foods`

## API Endpoints

### Food Endpoints
- `GET /api/foods`
  Fetch all food items
- `POST /api/foods`
  Add a food item

### User Endpoints
- `POST /api/users/register`
  Register a new user

### Sample Signup Request

```json
{
  "name": "Demo User",
  "email": "demo@example.com",
  "password": "password123"
}
```

### Sample Signup Response

```json
{
  "id": 1,
  "name": "Demo User",
  "email": "demo@example.com"
}
```
Made by Harleen Kaur
