const mongoose = require("mongoose");

const sportSchema = new mongoose.Schema({
    name: String,
    type: String
}, {timestamps: true});

const Sport = mongoose.model("newsport", sportSchema);

module.exports = Sport;