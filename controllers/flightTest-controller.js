const models = require("../models")
const demoQuestions = require("../config/samples");

module.exports = {
    getIndex: function (req, res, next) {
        const user = req.user;
        return res.render("index", { user });
    },
    getQuestion: function (req, res) {
        // if user is logged in, show real questions
        // if not show demo question

        const user = req.user;
        if (!user) {
            return res.render("question", { questions: demoQuestions });
        }

        const category = req.params.category;
        // limit should be the number of questions the user wants

        const category = req.params.category;

        models.questionModel
            .find({ "Chapter": category })
            .limit(7)
            .then(questions => {
                return res.render("question", { user, questions });
            })
            .catch(err => {
                console.log(err);
            });
    },
    getCategories: function (req, res) {
        return res.render("categories", { user: req.user });
    },

    getNotFound: function (req, res) {
        return res.render("404");
    }
}
