const router = require("express").Router();
const mongoose = require("mongoose");
const Review = require("../models/Review.model.js");
const Cafe = require("../models/Cafe.model.js");
const User = require("../models/User.model.js");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

//POST
router.post("/reviews/:cafeId", isAuthenticated, (req, res, next) => {
  const { cafeId } = req.params;
  const userId = req.payload._id;   // get userId from payload

  User.findById(userId)
    .then((user) => {
      req.body.user = { name: user.name };  // Currently we only display the name of the user - if we want to add more infos, change this {}.
      return Review.create(req.body);
    })
    .then((newReview) => {
      const reviewId = newReview._id
      return Cafe.findByIdAndUpdate(cafeId, { $push: { reviews: reviewId } })     // Update Cafe & add reviewId to the array "reviews"
        .then(() => res.status(201).json(newReview))
    })
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
