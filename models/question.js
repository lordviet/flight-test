const mongoose = require("mongoose");

module.exports = mongoose.model("Question", new mongoose.Schema({}), "questions");


