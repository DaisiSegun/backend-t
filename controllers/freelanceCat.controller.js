const FreelanceCat = require("../models/freelanceCat.model.js");
const createError = require("../utils/createError.js");

const createFreelanceCat = async (req, res, next) => {
  try {
    const { title, desc, category, imageUrl, id } = req.body;

    // Create a new cat instance
    const newFreelanceCat = new FreelanceCat({
      title,
      desc,
      category,
      image: imageUrl,
      id,
    });

    // Save the cat to the database
    await newFreelanceCat.save();

    // Respond with a success message
    res.status(201).json({ message: 'FreelanceCat created successfully', freelanceCat: newFreelanceCat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
    next(error);
  }
};

const getAllFreelanceCats = async (req, res, next) => {
  try {
    // Retrieve all cats from the database
    const freelanceCats = await FreelanceCat.find();

    // Respond with the list of cats
    res.status(200).json({ freelanceCats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
    next(error);
  }
};

const getFreelanceCatById = async (req, res, next) => {
  const freelanceCatId = req.params.id;

  try {
    // Retrieve a single cat by its ID
    const freelanceCat = await FreelanceCat.findById(freelanceCatId);

    if (!freelanceCat) {
      return next(createError(404, 'FreelanceCat not found'));
    }

    // Respond with the cat data
    res.status(200).json({ cat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
    next(error);
  }
};

module.exports = { createFreelanceCat, getAllFreelanceCats, getFreelanceCatById };
