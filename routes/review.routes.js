const router = require("express").Router();
const mongoose = require("mongoose");
const Review = require("../models/Review.model.js");

// const { isAuthenticated } = require("./middleware/jwt.middleware.js");

//POST
router.post("/reviews", (req, res, next) => {
  Review.create(req.body)
    .then((newReview) => res.status(201).json(newReview))
    .catch((err) => {
      next(err);
    });
});

//READ
router.get("/reviews", (req, res, next) => {
  Review.find()
    .populate("user")
    .then((allReviews) => res.status(200).json(allReviews))
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
