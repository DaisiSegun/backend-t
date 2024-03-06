const Cat = require("../models/cat.model.js");
const createError = require("../utils/createError.js");

const createCat = async (req, res, next) => {
  try {
    const { title, desc, category, imageUrl, id } = req.body;

    // Create a new cat instance
    const newCat = new Cat({
      title,
      desc,
      category,
      image: imageUrl,
      id,
    });

    // Save the cat to the database
    await newCat.save();

    // Respond with a success message
    res.status(201).json({ message: 'Cat created successfully', cat: newCat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
    next(error);
  }
};

const getAllCats = async (req, res, next) => {
  try {
    // Retrieve all cats from the database
    const cats = await Cat.find();

    // Respond with the list of cats
    res.status(200).json({ cats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
    next(error);
  }
};

const getCatById = async (req, res, next) => {
  const catId = req.params.id;

  try {
    // Retrieve a single cat by its ID
    const cat = await Cat.findById(catId);

    if (!cat) {
      return next(createError(404, 'Cat not found'));
    }

    // Respond with the cat data
    res.status(200).json({ cat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
    next(error);
  }
};

module.exports = { createCat, getAllCats, getCatById };
