const questions = require("../config/samples");
const jwtConfig = require("../utils/jwt");

// const tests = require("../config/database.json");

module.exports = {
    getIndex: function (req, res, next) {
        const user = req.user;
        // const token = req.cookies["auth_cookie"];
        // if (!token) { return res.render("index"); }

        // const data = jwt.verify(token, jwtConfig.secret);

        // userModel.findOne({ _id: data.userId }).then(authUser => {
        //     if (!authUser) { res.status(401).send("please log in"); return; }

        //     req.user = authUser;

        //     return res.render("index", { isAuth: token !== null ? true : false, username: req.user.username });
        // });
        return res.render("index", { user });
    },
    getQuestion: function (req, res) {
        // if user is logged in, show real questions
        // if not show demo question
        return res.render("question", { questions, user: req.user });
    },
    getCategories: function (req, res) {
        return res.render("categories", {user: req.user});
    },

    getNotFound: function (req, res) {
        return res.render("404");
    }
}
