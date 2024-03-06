const { Schema, model } = require("mongoose");   //const Schema = mongoose.Schema;

const cafeSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required."],
            unique: true,
        },
        image: {
            type: String,
            required: [true, "Image is required."],
        },
        description: {
            type: String,
            required: [true, "Description is required."],
        },
        location: [{
            city: { type: String, required: [true, "City is required."] },
            neighborhood: { type: String },
            adress: { type: String, required: [true, "Adress is required."] }
        }],
        specs: Array,
        reviews: [{
            type: Schema.Types.ObjectId,
            ref: "Review",
        }]
    },
);

const Cafe = model("Cafe", cafeSchema);

module.exports = Cafe;
