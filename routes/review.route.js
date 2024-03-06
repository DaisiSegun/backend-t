const express = require('express');const reviewController = require('../controllers/review.controller.js');

const router = express.Router();

router.post("/",  reviewController.createReview);
router.get("/:serviceId", reviewController.getReviews);
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
