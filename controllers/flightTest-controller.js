const fs = require("fs");
// const tests = require("../config/database.json");

module.exports = {
    getIndex: function (req, res) {
        return res.render("index");
    },
    getQuestion: function (req, res) {
        return res.render("question");
    }
}