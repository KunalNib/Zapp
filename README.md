# Zapp

Zapp is a full-stack e-commerce application with a customer storefront, authentication flow, cart and checkout, and an admin dashboard for managing products, users, orders, and sales.

## Overview

This repository is split into two apps:

- `frontend/` - React + Vite single-page application
- `backend/` - Express + MongoDB REST API

The app supports:

- User registration, email verification, login, logout, and password reset via OTP
- Product browsing, filtering, sorting, and product detail views
- Cart management and protected checkout
- Razorpay payment flow and payment verification
- Address management during checkout
- Admin-only product management, order views, user views, and sales analytics

## Tech Stack

- Frontend: React 19, Vite, React Router, Redux Toolkit, Redux Persist, Tailwind CSS, shadcn/ui, Sonner, Axios
- Backend: Node.js, Express 5, MongoDB, Mongoose, JWT, bcryptjs, Multer, Cloudinary, Nodemailer, Razorpay

## Project Structure

```text
Zapp/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.jsx
│   └── package.json
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   └── index.js
└── README.md
```

## Features

### Customer Side

- Account signup with email verification
- Login and session persistence
- Password reset using OTP
- Product listing with search, brand filter, category filter, price filter, and sorting
- Product details page with image zoom
- Cart add/remove/update quantity
- Address entry and saved address selection
- Razorpay checkout
- Order success and order history pages

### Admin Side

- Sales dashboard
- Add, edit, and delete products
- View all orders
- View all users
- View individual user details and user-specific orders

## Prerequisites

- Node.js 18+ recommended
- npm
- MongoDB database
- Cloudinary account
- Razorpay account
- SMTP email account for verification and OTP emails

## Setup

### 1. Clone the repository

```bash
git clone <repo-url>
cd Zapp
```

### 2. Install dependencies

Install frontend and backend dependencies separately:

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside `backend/`:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

MAIL_USER=your_email_account
MAIL_PASS=your_email_password_or_app_password

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Create a `.env` file inside `frontend/`:

```env
VITE_BACKEND_URL=http://localhost:8000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

## Running the App

### Start the backend

```bash
cd backend
npm start
```

The backend listens on `PORT` from the environment file.

### Start the frontend

```bash
cd frontend
npm run dev
```

The Vite app usually runs on `http://localhost:5173`.

## Available Scripts

### Frontend

- `npm run dev` - Start the Vite dev server
- `npm run build` - Create a production build
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint

### Backend

- `npm start` - Start the API server with Nodemon

## Main Backend API Routes

### User

- `POST /api/user/register`
- `POST /api/user/verify`
- `POST /api/user/reverify`
- `POST /api/user/login`
- `POST /api/user/logout`
- `POST /api/user/forgot-password`
- `POST /api/user/verify-otp/:email`
- `GET /api/user/all-user`
- `GET /api/user/get-user/:userId`
- `PUT /api/user/update/:id`

### Products

- `GET /api/product/all-products`
- `POST /api/product/add-product`
- `PUT /api/product/update/:productId`
- `DELETE /api/product/delete/:productId`

### Cart

- `GET /api/cart/`
- `POST /api/cart/add`
- `PUT /api/cart/update`
- `DELETE /api/cart/remove`

### Orders

- `POST /api/orders/create-order`
- `POST /api/orders/verify-payment`
- `GET /api/orders/my-order`
- `GET /api/orders/user-order/:userId`
- `GET /api/orders/all-orders`
- `GET /api/orders/sales`

## Notes

- Protected routes rely on a Bearer token stored in `localStorage` as `accessToken`.
- Admin routes require the logged-in user to have the `admin` role.
- Product images are uploaded to Cloudinary.
- Checkout and payment verification use Razorpay.
- Redux state is persisted in browser storage so cart and user state survive refreshes.

## Sample Data

There is sample product data in `backend/utils/data.js` if you want to seed the database manually.

## License

No license has been specified for this project yet.
