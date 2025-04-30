const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Product = require('../../database/models/productsModel');
require('dotenv').config();
const cloudinary = require('../../database/migrations/config/cloudinary');

// create product

const registerProducts = async (req, res) => {
    try {
        const { name, price, description, stock } = req.body;
        const sellerId = 2; // Extract sellerId from token
        console.log("req file: ", req.file.path);

        if (!req.file) {
            return res.status(400).json({ error: "Image upload failed" });
        }

        const result = await cloudinary.uploader.upload(req.file.path, (err, result) => {
            if (err) {
                console.error("Cloudinary upload error:", err);
                return res.status(500).json({ error: "Image upload failed" });
            }
        console.log('the file on cloud', result)
        })
          console.log("Cloudinary Result Console log : ", result);

        await Product.create({
            name, price, description, stock,
            sellerId, // Automatically assign seller ID from JWT
            imageUrl : result.secure_url, // Use the path of the uploaded image
        });

        res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
};


//update Products
const updateProduct = async (req, res) => {
    try {

        const { id } = req.params;
        const [update] = await Product.update(req.body, {
            where: { id: id }
        });
        if(update){
            res.status(201).json({ message: 'Product Updated successfully' });
        } else {
            res.status(201).json({ message: 'Product Not Found  ' });
        }
        
    } catch (error) {
        console.error('error messages', error);
        res.status(500).json({ error: error.message });
    }
};

//Delete Product
const deleteProduct = async (req, res) => {
    try {

        const { id } = req.params;
        const deleted = await Product.destroy({
            where: { id: id }
        });
        if(deleted){
            res.status(201).json({ message: 'Product Updated successfully' });
        } else {
            res.status(201).json({ message: 'Product Not Found  ' });
        }
        
    } catch (error) {
        console.error('error messages', error);
        res.status(500).json({ error: error.message });
    }
};

//getAllusers
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMyProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.findAll({
            where: { sellerId: id }
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getProductsCount = async (req, res) => {
    try {
        const count = await Product.count();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports= { updateProduct, deleteProduct, getAllProducts, registerProducts, getMyProducts, getProductsCount };