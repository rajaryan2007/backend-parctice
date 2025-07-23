// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const connectToDB = require('./database/db');
const bookRoutes = require('./routes/BookRoutes')

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectToDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Simple test route (optional, for verifying server is running)
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/books',bookRoutes); 

// Start the server
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
