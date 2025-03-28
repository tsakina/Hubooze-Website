# Hubooze

## Overview
Hubooze is an e-commerce platform specializing in a seamless shopping experience for beverages. This repository contains the complete codebase, including frontend, backend, and integrations for payment and shipping solutions.

## Features
- **Product Filtering:** Users can filter products based on category, subcategory, brand, size, color, and price.
- **User Authentication:** Secure authentication with login and registration features.
- **Shopping Cart & Checkout:** Smooth shopping cart experience with an integrated payment gateway.
- **Order Management:** Users can track their orders, and admins can manage inventory and fulfillment.
- **Shipping Integration:** Real-time shipping calculations and tracking.
- **Admin Dashboard:** Allows admins to manage products, users, and orders efficiently.

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Payment Integration:** Razorpay/Stripe
- **Shipping API:** Shiprocket

## Setup Instructions
1. **Clone the Repository**
   ```sh
   git clone https://github.com/yourusername/hubooze.git
   cd hubooze
   ```

2. **Install Dependencies**
   ```sh
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend folder and add the following variables:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   RAZORPAY_KEY=your_razorpay_key
   SHIPROCKET_API_KEY=your_shiprocket_api_key
   ```

4. **Run the Application**
   ```sh
   # Start the backend server
   cd backend
   npm run dev

   # Start the frontend server
   cd ../frontend
   npm start
   ```

5. **Access the Application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

## Contribution Guidelines
- Fork the repository and create a feature branch.
- Follow best coding practices and maintain code readability.
- Ensure all features are tested before submitting a PR.
- Submit a pull request with a detailed description of your changes.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact
For any queries, reach out at **support@hubooze.in**

