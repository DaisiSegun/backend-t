const Product = require("../models/product.model.js");
const createError = require("../utils/createError.js");

const createProduct = async (req, res, next) => {
  // if (!req.isSeller)
  //   return next(createError(403, "Only a SP can create a Service!"));

  const newProduct = new Product({
    userId: req.body.userId,
    ...req.body,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    next(err);
  }
};


const editProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    // Check if the user has the permission to edit this service
    if (product.userId !== req.body.userId) {
      return next(createError(403, "You can edit only your Procut!"));
    }

    // Update each field individually if it exists in the request body
    if (req.body.title) {
      product.title = req.body.title;
    }
    console.log(product.title)

    if (req.body.cat) {
      product.cat = req.body.cat;
    }

    if (req.body.desc) {
      product.desc = req.body.desc;
    }

    if (req.body.price) {
      product.price = req.body.price;
    }
    if (req.body.shortDesc) {
      product.shortDesc = req.body.shortDesc;
    }
    
    if (req.body.images && Array.isArray(req.body.images)) {
      product.images = [...product.images, ...req.body.images];
    }

    // Save the updated service
    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};








const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log(product)
 
    if (product.userId !== req.body.userId)
      return next(createError(403, "You can delete only your Service!"));
   

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("Product has been deleted!");
  } catch (err) {
    next(err);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) next(createError(404, "product not found!"));
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
};

const getProducts = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
  };

  // Add search query to filters
  if (q.search) {
    filters.title = { $regex: q.search, $options: "i" };
  }

  try {
    const products = await Product.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(products);
  } catch (err) {
    next(err);
  }
};

const getProductSuggestions = async (req, res, next) => {
  const q = req.query;
  const filters = {
    title: { $regex: q.search, $options: "i" },
  };

  try {
    const suggestions = await Product.find(filters, "title").limit(5); // Limit the number of suggestions
    const suggestionTitles = suggestions.map((product) => product.title);
    res.status(200).send(suggestionTitles);
  } catch (err) {
    next(err);
  }
};

module.exports = { createProduct, deleteProduct, getProduct, getProducts, getProductSuggestions, editProduct };
