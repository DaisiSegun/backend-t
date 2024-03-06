const express = require('express');
const productCatController = require('../controllers/productCat.controller.js');

const productCatRouter = express.Router();

// Route to create a new cat
productCatRouter.post('/create', productCatController.createProductCat);

// Route to get all cats
productCatRouter.get('/all', productCatController.getAllProductCats);

productCatRouter.get('/:id', productCatController.getProductCatById);

// Add more routes as needed, such as getting a specific cat by ID, updating, or deleting a cat

module.exports = productCatRouter;
