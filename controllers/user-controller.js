const models = require("../models");
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

            models.userModel.create({ username, password: hash }).then(() => {
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
        const { username, password } = req.body;
        models.userModel.findOne({ username })
            .then(user => Promise.all([user, user.matchPassword(password)]))
            .then(([user, match]) => {
                if (!match) {
                    res.render("login.hbs", { message: 'Wrong username or password'});
                    return;
                }

                const token = utils.jwt.createToken({id: user._id});
                res.cookie(appConfig.authCookieName, token).redirect("/");
            });
    },
    logout: function (req, res) {
        const token = req.cookies[appConfig.authCookieName];
        models.tokenBlacklistModel.create({ token }).then(() => {
            res.clearCookie(appConfig.authCookieName).redirect("/");
        });
    }
}
