const ProductCat = require("../models/productCat.model.js");
const createError = require("../utils/createError.js");

const createProductCat = async (req, res, next) => {
  try {
    const { title, desc, category, imageUrl, id } = req.body;

    // Create a new cat instance
    const newProductCat = new ProductCat({
      title,
      desc,
      category,
      image: imageUrl,
      id,
    });

    // Save the cat to the database
    await newProductCat.save();

    // Respond with a success message
    res.status(201).json({ message: 'ProductCat created successfully', productCat: newProductCat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
    next(error);
  }
};

const getAllProductCats = async (req, res, next) => {
  try {
    // Retrieve all cats from the database
    const productCats = await ProductCat.find();

    // Respond with the list of cats
    res.status(200).json({ productCats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
    next(error);
  }
};

const getProductCatById = async (req, res, next) => {
  const productCatId = req.params.id;

  try {
    // Retrieve a single cat by its ID
    const productCat = await FreelanceCat.findById(productCatId);

    if (!productCat) {
      return next(createError(404, 'ProductCat not found'));
    }

    // Respond with the cat data
    res.status(200).json({ cat });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
    next(error);
  }
};

module.exports = { createProductCat, getAllProductCats, getProductCatById };
