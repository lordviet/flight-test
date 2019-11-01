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

        // Chapter : should be whatever the user adds as an input
        // limit should be the number of questions the user wants

        const category = req.params.category;

        models.questionModel
            .find({ "Chapter": category })
            .limit(2)
            .then(questions => {
                console.log(questions)
                return res.render("question", { questions, user });
            }).catch(console.error);
    },
    getCategories: function (req, res) {
        return res.render("categories", { user: req.user });
    },

    getNotFound: function (req, res) {
        return res.render("404");
    }
}
