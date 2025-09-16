# Ecommerce API

A simple backend API for an ecommerce platform built with Node.js, Express, and MongoDB.


##  Quick Start

1. **Clone the repo**
```bash
git clone https://github.com/Nikita-kanwar/Xebia-Internship.git
cd Backend/Backend\ Final\ Task/Ecommerce\ API
Install dependencies


npm install
Create a .env file in the root directory:

env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=1d
Start the server


npm run dev   # Development mode
npm start     # Production mode
Server runs at: http://localhost:5000

 Testing
Use Postman to test the APIs.
For protected routes, add the header:

Authorization: Bearer <your_jwt_token>
