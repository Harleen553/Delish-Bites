# Delish Bites Food Delivery System

Delish Bites is a full-stack food delivery demo project with:

- a static multi-page frontend built with HTML, CSS, and JavaScript
- a Spring Boot backend built with Java and Maven
- MySQL for persistence of users records

The frontend handles browsing, search, category filtering, cart management, sign up, sign in, and profile management. The backend exposes REST APIs for food and user operations and stores user data in MySQL with BCrypt-hashed passwords.

## Team Members 

- Harleen Kaur
- Likitha Venugopal

## What This Project Does

This application currently supports:

- browsing featured food items on the landing page
- viewing a larger categorized menu
- filtering food cards by category on the landing page
- searching foods on the landing page and menu page
- adding items to a cart from multiple pages
- opening a cart side panel from the landing page and menu page
- viewing a full cart summary on a dedicated cart page
- entering a delivery address for a simulated checkout
- creating a user account through the backend API
- signing in with an existing account
- storing the signed-in user in browser `localStorage`
- updating profile name, email, and password
- deleting an account from the database
- showing a profile dropdown in the navbar when a user is signed in

## Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- Font Awesome icons
- `localStorage` for cart and client-side auth state

### Backend

- Java 17
- Spring Boot
- Maven Wrapper

### Database

- MySQL

## High-Level Architecture

The project is split into two layers:

### 1. Frontend

Located in the project root:

- `index.html`
- `home.html`
- `menu.html`
- `cart.html`
- `sign.html`
- `sign-in.html`
- `profile.html`
- shared and page-specific CSS/JS files

This part is served as static files by a simple local web server such as `jwebserver` or VS Code Live Server.

### 2. Backend

Located in:

- `food-delivery/`

This is a Spring Boot application that:

- connects to MySQL
- exposes `/api/...` endpoints
- validates incoming user requests
- hashes passwords before saving users
- handles duplicate email checks
- returns JSON responses and JSON validation errors

## Project Structure

```text
FoodDeliverySystem/
|-- auth.js
|-- cart.css
|-- cart.html
|-- cart.js
|-- home.css
|-- home.html
|-- index.html
|-- launch.json
|-- menu.css
|-- menu.html
|-- profile.css
|-- profile.html
|-- profile.js
|-- README.md
|-- script.js
|-- search.js
|-- sign.css
|-- sign.html
|-- sign.js
|-- sign-in.html
|-- sign-in.js
|-- site-config.js
|-- styles.css
|-- .vscode/
|   |-- settings.json
|-- images/
|   |-- ...food and background images
|-- food-delivery/
|   |-- .env
|   |-- .env.example
|   |-- mvnw
|   |-- mvnw.cmd
|   |-- pom.xml
|   |-- lib/
|   |-- .mvn/
|   |   |-- wrapper/
|   |       |-- maven-wrapper.properties
|   |-- src/
|       |-- main/
|       |   |-- java/com/fooddelivery/
|       |   |   |-- FoodDeliveryApplication.java
|       |   |   |-- config/
|       |   |   |   |-- WebConfig.java
|       |   |   |-- controller/
|       |   |   |   |-- ApiExceptionHandler.java
|       |   |   |   |-- FoodController.java
|       |   |   |   |-- UserController.java
|       |   |   |-- model/
|       |   |   |   |-- User.java
|       |   |   |-- repository/
|       |   |   |   |-- UserRepository.java
|       |   |   |-- service/
|       |   |       |-- UserService.java
|       |   |-- resources/
|       |       |-- application.properties
|       |-- test/
|           |-- java/com/fooddelivery/
|               |-- FoodDeliveryApplicationTests.java
```

## Frontend Pages

## `index.html`

This is the landing page.

Main elements:

- sticky header with navbar
- hero section with search bar
- food category cards
- featured food cards
- right-side cart modal
- footer with external links

Behavior:

- category cards filter the featured food cards
- search filters featured food cards by title
- add-to-cart buttons store items in `localStorage`
- cart icon opens a modal summary
- auth area shows:
  - `Sign In` and `Sign Up` when logged out
  - profile icon with dropdown when logged in

## `home.html`

This works like an about/promotional page.

Main elements:

- hero banner
- service highlights
- how-it-works section
- testimonials
- popular dishes section
- footer

Behavior:

- uses the same shared navbar/cart/auth behavior as the landing page
- featured dishes can be added to cart

## `menu.html`

This is the full menu browsing page.

Main elements:

- menu hero section
- menu search input
- menu sections grouped by category:
  - fast food
  - Italian
  - non-veg
  - veg
  - desserts

Behavior:

- menu search hides non-matching menu items
- add-to-cart works for all dishes
- cart side panel is available

## `cart.html`

This is the dedicated checkout/cart page.

Main elements:

- cart item list
- subtotal
- delivery fee
- total
- delivery address form

Behavior:

- reads items from `localStorage`
- allows removing items
- validates that the cart is not empty
- validates address fields
- simulates checkout with a success alert
- clears the cart after a successful simulated checkout

## `sign.html`

This is the sign-up page.

Main elements:

- full name input
- email input
- password input
- signup status message

Behavior:

- sends a `POST` request to `/api/users/register`
- validates required fields on the client
- requires password length of at least 8
- stores the returned user in `localStorage`
- redirects to the landing page after successful signup

## `sign-in.html`

This is the sign-in page.

Main elements:

- email input
- password input
- status message

Behavior:

- sends a `POST` request to `/api/users/login`
- stores the logged-in user in `localStorage`
- redirects to the landing page after successful sign-in

## `profile.html`

This is the logged-in account page.

Main elements:

- profile update form
- delete account form

Behavior:

- redirects to sign-in if no user is stored in browser auth state
- pre-fills the signed-in user's name and email
- updates user details with `PUT /api/users/{id}`
- can change password if a new password is provided
- can delete the account with `DELETE /api/users/{id}`
- clears local auth and cart data after account deletion

## Frontend JavaScript Files

## `site-config.js`

Shared frontend config.

It contains:

- page route mapping:
  - `home`
  - `about`
  - `menu`
  - `signup`
  - `signin`
  - `profile`
  - `cart`
- API base URL:
  - built from current browser protocol and host, with backend port `8080`
- shared delivery fee:
  - `30`

This file prevents route and API URLs from being scattered across multiple files.

## `auth.js`

Shared auth/navigation helper for the frontend.

Responsibilities:

- stores signed-in user in `localStorage` under `authUser`
- renders navbar auth state
- swaps between logged-out buttons and logged-in profile dropdown
- handles logout
- updates internal links with `data-route`

Current auth model:

- simple browser-side session using `localStorage`
- not a token-based or server-session auth system

## `script.js`

Shared behavior for pages that use the cart modal and featured food cards.

Responsibilities:

- add items to cart
- open and close the cart modal
- update cart badge counts
- calculate subtotal and total
- sync cart data to `localStorage`
- handle category filtering on the landing page

## `search.js`

Handles frontend search.

Responsibilities:

- landing page search over `.food-card`
- menu page search over `.menu-item`

Implementation detail:

- the search is purely client-side and hides/shows cards using CSS classes

## `cart.js`

Logic for `cart.html`.

Responsibilities:

- read cart from `localStorage`
- render cart items
- remove items
- update totals
- validate checkout form
- simulate placing an order

## `sign.js`

Logic for sign-up.

Responsibilities:

- collect signup form values
- validate fields
- call backend register API
- store returned user in client auth state
- redirect on success

## `sign-in.js`

Logic for sign-in.

Responsibilities:

- collect login form values
- validate fields
- call backend login API
- store returned user in client auth state
- redirect on success

## `profile.js`

Logic for the profile page.

Responsibilities:

- require an authenticated local user
- prefill form values
- call update profile API
- call delete account API
- clear local auth/cart state when account is deleted

## Frontend CSS Files

## `styles.css`

Main shared stylesheet used across the main site pages.

It covers:

- layout container
- header/navbar
- shared buttons
- cart modal
- food card layout
- footer
- auth/profile dropdown styles
- shared hidden-state styles for search/filtering

## `home.css`

Styles used by `home.html`.

It covers:

- hero banner
- CTA buttons
- features section
- testimonials section
- how-it-works section

## `menu.css`

Styles specific to the menu page.

## `cart.css`

Styles specific to the cart page.

## `sign.css`

Shared styles for both:

- `sign.html`
- `sign-in.html`

It defines the centered auth card layout and input styling.

## `profile.css`

Styles the profile page layout.

It covers:

- profile update card
- delete account card
- responsive two-column layout

## Backend Overview

The backend follows a standard Spring Boot layered structure:

- controller layer
- service layer
- repository layer
- model/entity layer
- config layer

## Backend Entry Point

## `FoodDeliveryApplication.java`

Main Spring Boot launcher:

```java
SpringApplication.run(FoodDeliveryApplication.class, args);
```

## Config

## `WebConfig.java`

Configures CORS for `/api/**`.

Allowed methods:

- `GET`
- `POST`
- `PUT`
- `DELETE`

Allowed origins come from:

- `app.cors.allowed-origins`

This is important when serving the frontend from a local static server on a different port such as `5500`.

## Error Handling

## `ApiExceptionHandler.java`

Handles `ResponseStatusException` globally and returns JSON like:

```json
{
  "timestamp": "2026-03-24T12:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Name is required."
}
```

This allows the frontend to show friendly error messages from the backend.

## Models

## `User.java`

Mapped to the `users` table.

Fields:

- `id`
- `name`
- `email`
- `password`

Notes:

- `email` is unique
- `password` is stored as a BCrypt hash, not plain text

## Repositories

## `UserRepository.java`

Extends `JpaRepository<User, Long>`.

Custom methods:

- `findByEmail(String email)`
- `findByName(String name)`
- `existsByEmail(String email)`

## Services

## `UserService.java`

Contains the main user business logic.

Current responsibilities:

- validate registration input
- normalize email to lowercase
- reject duplicate emails
- enforce minimum password length
- hash passwords using BCrypt
- validate login credentials
- update user profile
- change password if requested
- delete user after password confirmation

Validation rules currently in code:

- name is required
- email is required
- password is required for registration
- password must be at least 8 characters for registration
- current password is required for profile updates
- current password is required for account deletion
- new password, if provided during profile update, must be at least 8 characters

## Controllers

## `FoodController.java`

Base path:

- `/api/foods`

Endpoints:

- `GET /api/foods`
- `POST /api/foods`

## `UserController.java`

Base path:

- `/api/users`

Endpoints:

- `POST /api/users/register`
- `POST /api/users/login`
- `PUT /api/users/{id}`
- `DELETE /api/users/{id}`

The controller returns a safe user response with:

- `id`
- `name`
- `email`

It does not return the hashed password.

## Database Setup

The backend reads environment-style configuration from:

- `food-delivery/.env`

Template file:

- `food-delivery/.env.example`

## Environment Variables

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `JPA_DDL_AUTO`
- `JPA_SHOW_SQL`
- `APP_CORS_ALLOWED_ORIGINS`

## Example `.env`

```env
DB_URL=jdbc:mysql://localhost:3306/fooddelivery
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
JPA_DDL_AUTO=update
JPA_SHOW_SQL=true
APP_CORS_ALLOWED_ORIGINS=http://127.0.0.1:5500,http://localhost:5500
```

## Database Tables

Tables expected/created by JPA:

- `users`

With `JPA_DDL_AUTO=update`, Hibernate will attempt to create or update the schema automatically.

## Dependencies

The backend Maven dependencies in `pom.xml` are:

- `spring-boot-starter-data-jpa`
- `spring-boot-starter-web`
- `spring-security-crypto`
- `mysql-connector-j`
- `spring-boot-starter-test`

## How to Run the Project

## Prerequisites

Install or make sure you have:

- Java 17
- MySQL
- an available MySQL user with permission to create/use databases
- a simple static file server

Optional:

- VS Code with Live Server
- a browser debugging setup using `launch.json`

## Step 1. Create the MySQL database

Run in MySQL:

```sql
CREATE DATABASE fooddelivery;
```

## Step 2. Configure backend environment

Open:

- `food-delivery/.env`

If it does not exist, copy from:

- `food-delivery/.env.example`

Then set your real MySQL credentials.

## Step 3. Start the backend

Open a terminal in:

```powershell
C:\Users\Harleenk\OneDrive\Desktop\Food\MD_2\FoodDeliverySystem\food-delivery
```

Run:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend will start on:

- `http://localhost:8080`

## Step 4. Start the frontend

Open another terminal in:

```powershell
C:\Users\Harleenk\OneDrive\Desktop\Food\MD_2\FoodDeliverySystem
```

Run one of the following.

### Option A. Using `jwebserver`

```powershell
jwebserver -p 5500 -d .
```

### Option B. Using VS Code Live Server

Serve the `FoodDeliverySystem` folder on port `5500` or another port allowed by CORS.

## Step 5. Open the application

Open in browser:

- `http://127.0.0.1:5500/index.html`

You can also browse directly to:

- `http://127.0.0.1:5500/home.html`
- `http://127.0.0.1:5500/menu.html`
- `http://127.0.0.1:5500/cart.html`
- `http://127.0.0.1:5500/sign.html`
- `http://127.0.0.1:5500/sign-in.html`
- `http://127.0.0.1:5500/profile.html`

## How to Use the App

## Browse and Search Food

1. Open `index.html` or `menu.html`.
2. Use the category cards on the landing page to filter foods.
3. Use the search bar to search dishes by name or description.

## Add to Cart

1. Click `Add to Cart` on any food item.
2. The cart count updates in the navbar.
3. On pages with the cart modal, the side cart opens automatically.
4. Use the cart page for final review.

## Sign Up

1. Open `sign.html`.
2. Enter name, email, and a password of at least 8 characters.
3. Submit the form.
4. On success, the user is stored in browser auth state and redirected home.

## Sign In

1. Open `sign-in.html`.
2. Enter an existing email and password.
3. Submit the form.
4. On success, the navbar changes to a profile icon dropdown.

## Edit Profile

1. Sign in first.
2. Open the profile dropdown from the navbar.
3. Click `Profile`.
4. Change name and/or email.
5. Enter the current password.
6. Optionally enter a new password.
7. Click `Save Changes`.

## Delete Account

1. Open the profile page.
2. Enter the current password in the delete section.
3. Confirm deletion.
4. The account is removed from MySQL and local auth/cart state is cleared.

## Checkout Flow

1. Open `cart.html`.
2. Verify cart items.
3. Fill in street, city, and PIN code.
4. Click `Proceed to Checkout`.
5. The app shows a success alert and clears the cart.

## API Reference

## `GET /api/foods`

Returns all food records from the database.

Example response:

```json
[
  {
    "id": 1,
    "name": "Burger",
    "price": 90.0
  }
]
```

## `POST /api/foods`

Creates a new food record.

Example request:

```json
{
  "name": "Paneer Wrap",
  "price": 140.0
}
```

## `POST /api/users/register`

Registers a new user.

Example request:

```json
{
  "name": "Demo User",
  "email": "demo@example.com",
  "password": "password123"
}
```

Example response:

```json
{
  "id": 1,
  "name": "Demo User",
  "email": "demo@example.com"
}
```

## `POST /api/users/login`

Signs in an existing user.

Example request:

```json
{
  "email": "demo@example.com",
  "password": "password123"
}
```

Example response:

```json
{
  "id": 1,
  "name": "Demo User",
  "email": "demo@example.com"
}
```

## `PUT /api/users/{id}`

Updates a user profile.

Example request:

```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "currentPassword": "password123",
  "newPassword": "newpassword123"
}
```

Notes:

- `newPassword` may be left empty to keep the old password
- `currentPassword` is always required

## `DELETE /api/users/{id}`

Deletes a user account.

Example request:

```json
{
  "currentPassword": "password123"
}
```

## Running Tests

Open a terminal in:

```powershell
C:\Users\Harleenk\OneDrive\Desktop\Food\MD_2\FoodDeliverySystem\food-delivery
```

Run:

```powershell
.\mvnw.cmd clean test
```

Current test coverage:

- one Spring Boot context load test in `FoodDeliveryApplicationTests.java`

## Useful Development Files

## `launch.json`

Provides a browser launch config pointing to:

- `http://127.0.0.1:5500/index.html`

## `.vscode/settings.json`

Contains Java workspace settings for automatic build configuration updates.

## Images

The `images/` folder contains:

- hero backgrounds
- menu item photos
- category and dish visuals used across pages

These images are referenced directly by the static HTML pages.
