const express = require('express');
const dotenv = require('dotenv');
const { connectMongoDb } = require('./config/db');
const authRoutes = require("./routes/auth"); 

dotenv.config();

// connection
connectMongoDb(); 

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);  

app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
