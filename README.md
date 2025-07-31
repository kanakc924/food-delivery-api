Project Purpose:
This project is a simple Food Delivery API built using Node.js and Express. It allows restaurants to manage menu items, customers to place orders, and admins to manage users. It demonstrates key backend concepts like JWT authentication, role-based access, request validation, custom middleware, and error handling.

How to Install and Run:
# Clone the repo
git clone https://github.com/your-username/food-delivery-api.git
cd food-delivery-api

# Install dependencies
npm install

# Start the server
node src/app.js

How to Test the API:
You can test the API in two ways:
 
Option 1: Run the test script
node test/testScript.js

This will:
-Register a customer
-Login to get a token
-Place a sample order

Option 2: Use Postman or Thunder Client
-Import your API endpoints manually or use a Postman collection
-Login and copy the token
-Use Bearer <token> in the Authorization header to access protected routes



