const userModel = require("../models/user");
const utils = require("../utils");
const appConfig = require("../app-config");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
    getRegister: function (req, res) {
        return res.render("register");
    },
    postRegister: function (req, res, next) {
        const { username, password, repeatPassword } = req.body;
        if (password !== repeatPassword) {
            return res.status(400).send("Password must match repeat password");
        }
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) { next(err); return; }

            userModel.create({ username, password: hash }).then(() => {
                res.redirect("/login");
            }).catch(err => {
                if (err.name === 'MongoError' && err.code === 11000) {
                    return res.status(400).send("Username already taken");
                }
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
                    return res.status(400).send("Username does not exist");
                }

                bcrypt.compare(req.body.password, authUser.password)
                    .then(result => {
                        if (!result) {
                            return res.status(400).send("Wrong password");
                        }

                        const token = utils.jwt.createToken({id: authUser._id});
                        res.cookie(appConfig.authCookieName, token).redirect("/");
                    });
            });
    },
    logout: function (req, res) {
        res.clearCookie(appConfig.authCookieName).redirect("/");
    }
}
