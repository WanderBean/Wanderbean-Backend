const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required."],
        },
        description: {
            type: String,
            required: [true, "Description is required."],
        },
        stars: { type: String, enum: ["1", "2", "3", "4", "5"]}, //// Check this!
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    },
);

const Review = model("Review", reviewSchema);

module.exports = Review;
