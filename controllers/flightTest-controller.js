const jwt = require("jsonwebtoken");
const questions = require("../config/samples");
const userModel = require("../models/user");
const jwtConfig = require("../utils/jwt");

// const tests = require("../config/database.json");


module.exports = {
    getIndex: function (req, res, next) {
        // const token = req.cookies["auth_cookie"];
        // if (!token) { return res.render("index"); }

        // const data = jwt.verify(token, jwtConfig.secret);

        // userModel.findOne({ _id: data.userId }).then(authUser => {
        //     if (!authUser) { res.status(401).send("please log in"); return; }

        //     req.user = authUser;

        //     return res.render("index", { isAuth: token !== null ? true : false, username: req.user.username });
        // });
        return res.render("index");
    },
    getQuestion: function (req, res) {
        // we should check the footer
        return res.render("question", { questions });
    }
}
