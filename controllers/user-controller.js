const userModel = require("../models/user");
const utils = require("../utils");
const appConfig = require("../app-config");
const bcrypt = require("bcrypt");


module.exports = {
    getRegister: function (req, res) {
        return res.render("register");
    },
    postRegister: function (req, res, next) {
        const { username, password } = req.body;

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) { next(err); return; }

            userModel.create({ username, password: hash }).then(user => {
                console.log(user);
                res.redirect("/login");
            });
        })
    },
    getLogin: function (req, res) {
        return res.render("login");
    },
    postLogin: function (req, res, next) {

        userModel.findOne({ "username": req.body.username })
            .then(authUser => {
                if (authUser === null) {
                    console.log("greshka");
                    return;
                }

                bcrypt.compare(req.body.password, authUser.password)
                    .then(result => {
                        if (!result) {
                            res.redirect("/");
                            return;
                        }

                        // sign() generates a new token
                        const token = jwt.sign({ userId: authUser._id }, jwtConfig.secret, jwtConfig.options);

                        res.cookie("auth_cookie", token).redirect("/");
                    })
            });
    },
    logout: function (req, res) {
        res.clearCookie("auth_cookie").redirect("/");
    }
}