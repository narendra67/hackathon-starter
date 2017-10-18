const mongoose = require("mongoose");

const venueSportSchema = new mongoose.Schema({
    name: String
});
const venuePhotoSchema = new mongoose.Schema({
    name: String,
    path: String
});

const venuePriceSchema = new mongoose.Schema({
    timings: Number,
    price: Number,
});
const venueReviewSchema = new mongoose.Schema({
    rating: Number,
    Description: String
});

const venueSchema = new mongoose.Schema({
    name: String,
    address: String,
    email: String,
    phone: Number,
    description: String,
    sports: [venueSportSchema],
    photos: [venuePhotoSchema],
    prices: [venuePriceSchema],
    reviews: [venueReviewSchema],
});

const Venue = mongoose.model("Venue", venueSchema);

module.exports = Venue;