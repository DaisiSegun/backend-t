const express = require('express');
const freelanceCatController = require('../controllers/freelanceCat.controller.js');

const freelanceCatRouter = express.Router();

// Route to create a new cat
freelanceCatRouter.post('/create', freelanceCatController.createFreelanceCat);

// Route to get all cats
freelanceCatRouter.get('/all', freelanceCatController.getAllFreelanceCats);

freelanceCatRouter.get('/:id', freelanceCatController.getFreelanceCatById);

// Add more routes as needed, such as getting a specific cat by ID, updating, or deleting a cat

module.exports = freelanceCatRouter;
