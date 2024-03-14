const router = require("express").Router();
const mongoose = require("mongoose");
const Cafe = require("../models/Cafe.model.js");

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

//POST - USER NEEDS TO BE LOGGED IN
router.post("/cafes", isAuthenticated, (req, res, next) => {
  Cafe.create(req.body)
    .then((newCafe) => res.status(201).json(newCafe))
    .catch((err) => {
      next(err);
    });

  if (
    req.body.title === "" ||
    req.body.image === "" ||
    req.body.description === "" ||
    req.body.location[0].city === "" ||
    req.body.location[0].address === ""
  ) {
    res.status(401).json({ message: "Please enter a title & description." });
    return;
  }
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
router.put("/cafes/:cafeId", isAuthenticated, (req, res, next) => {
  Cafe.findByIdAndUpdate(req.params.cafeId, req.body, { new: true })
    .then((updatedCafe) => res.status(200).json(updatedCafe))
    .catch((err) => {
      next(err);
    });
  if (
    req.body.title === "" ||
    req.body.image === "" ||
    req.body.description === "" ||
    req.body.location[0].city === "" ||
    req.body.location[0].address === ""
  ) {
    res.status(401).json({ message: "Please enter a title & description." });
    return;
  }
});

//DELETE - USER NEEDS TO BE LOGGED IN
router.delete("/cafes/:cafeId", isAuthenticated, (req, res, next) => {
  Cafe.findByIdAndDelete(req.params.cafeId)
    .then(() => res.status(204).send())
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
