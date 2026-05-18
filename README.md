# React E-Commerce Frontend

Modern React storefront for the `ecommerce-rest-api` backend.

## Features

- React 18 + Vite frontend
- Tailwind CSS responsive UI
- JWT authentication and protected routes
- Axios API integration with interceptors
- Home page, product listing, product detail, cart, checkout
- User dashboard and profile management
- Admin dashboard with product/category/user/order overview
- Flipkart-inspired layout with mobile-first design
- Toast notifications and loading states

## Installation

1. Navigate to the project folder:
   ```bash
   cd e:\projects\react-ecommerce
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment file:
   ```bash
   copy .env.example .env
   ```
4. Run the frontend:
   ```bash
   npm run dev
   ```

## Environment Variables

Create `.env` with:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

## Backend Integration

This frontend consumes the backend APIs exposed by `ecommerce-rest-api`:

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `PUT /users/profile`
- `GET /products`
- `GET /products/:id`
- `GET /products/search`
- `GET /categories`
- `POST /cart/add`
- `GET /cart`
- `PUT /cart/:id`
- `DELETE /cart/:id`
- `DELETE /cart`
- `POST /orders`
- `GET /orders`
- `PUT /orders/:id/cancel`
- `POST /payments/process`
- `GET /payments/:order_id`
- `GET /admin/dashboard/stats`
- `GET /users` (admin)
- `GET /orders/admin/all` (admin)

## Folder Structure

- `src/components` - reusable UI and layout components
- `src/pages` - app pages for public, auth, dashboard, and admin
- `src/context` - global state management
- `src/services` - API service wrappers
- `src/utils` - helper utilities and constants

## Notes

- Ensure the backend server is running at the configured `VITE_API_BASE_URL` before using the app.
- The UI and API integration are designed to match backend validation and response formats.
