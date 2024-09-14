//index.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 3001;

// Middleware setup
app.use(bodyParser.json());

// CORS setup
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from frontend on port 3000
    credentials: true,
}));

// Test route to ensure the server is running
app.get('/ping', (req, res) => {
    res.send('PONG');
});

// Route handlers
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

