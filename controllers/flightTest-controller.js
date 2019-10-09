const fs = require("fs");
const questions = require("../config/samples");
// const tests = require("../config/database.json");

module.exports = {
    getIndex: function (req, res) {
        console.log(questions)
        return res.render("index");
    },
    getQuestion: function (req, res) {
        // res.send(questions);
        return res.render("question", { questions });
    }
}