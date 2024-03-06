const express = require('express');
const catController = require('../controllers/cat.controller.js');

const catRouter = express.Router();

// Route to create a new cat
catRouter.post('/create', catController.createCat);

// Route to get all cats
catRouter.get('/all', catController.getAllCats);

catRouter.get('/:id', catController.getCatById);

// Add more routes as needed, such as getting a specific cat by ID, updating, or deleting a cat

module.exports = catRouter;
