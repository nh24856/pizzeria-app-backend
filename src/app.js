const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./api/users/userRoutes');
const prodRoutes = require('./api/products/productRoutes');
const orderRoutes = require('./api/orders/orderRoutes');
const app = express();

global.__basedir = __dirname + '/..'; // Set the base directory for file uploads

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/products', prodRoutes);
app.use('/api/orders', orderRoutes);

app.use('/' , (req, res) =>{
    res.send('Welcome to first Page');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});




