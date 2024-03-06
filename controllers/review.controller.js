const createError = require("../utils/createError.js");
const Review = require("../models/review.model.js");
const User = require("../models/user.model.js");

const createReview = async (req, res, next) => {
  // Check if the user is a seller and if they are trying to review their own service


  const newReview = new Review({
    userId: req.body.userId,
    serviceId: req.body.serviceId,
    desc: req.body.desc,
    star: req.body.star,
  });



  try {
    // TODO: You can add logic here to check if the user has purchased the service

    const savedReview = await newReview.save();

    await User.findByIdAndUpdate(req.body.sellerId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ serviceId: req.params.serviceId });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    // Add logic to delete a review if needed
  } catch (err) {
    next(err);
  }
};

module.exports = { createReview, getReviews, deleteReview };
