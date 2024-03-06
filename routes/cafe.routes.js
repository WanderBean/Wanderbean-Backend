const router = require("express").Router();
const mongoose = require("mongoose");
const Cafe = require("../models/Cafe.model.js");

// const { isAuthenticated } = require("./middleware/jwt.middleware.js");

//POST - USER NEEDS TO BE LOGGED IN
router.post("/cafes", (req, res, next) => {
  /// We need to check the URL
  Cafe.create(req.body)
    .then((newCafe) => res.status(201).json(newCafe))
    .catch((err) => {
      next(err);
    });   
});

//READ - LIST OF ALL CAFES
router.get("/cafes", (req, res, next) => {
  Cafe.find()
    .populate("reviews") // populate reviews
    .then((allCafes) => res.status(200).json(allCafes))
    .catch((err) => {
      next(err);
    });
});

//READ - LIST OF ONE SPECIFIC CAFE
router.get("/cafes/:cafeId", (req, res, next) => {
  Cafe.findById(req.params.cafeId)
    .populate("reviews") // populate reviews
    .then((cafeDetails) => res.status(200).json(cafeDetails))
    .catch((err) => {
      next(err);
    });
});

//UPDATE - USER NEEDS TO BE LOGGED IN
router.put("/cafes/:cafeId", (req, res, next) => {
  Cafe.findByIdAndUpdate(req.params.cafeId, req.body, { new: true })
    .then((updatedCafe) => res.status(200).json(updatedCafe))
    .catch((err) => {
      next(err);
    });
});

//DELETE - USER NEEDS TO BE LOGGED IN
router.delete("/cafes/:cafeId", (req, res, next) => {
  Cafe.findByIdAndDelete(req.params.cafeId)
    .then(() => res.status(204).send())
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
