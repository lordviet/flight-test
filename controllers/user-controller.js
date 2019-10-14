const models = require("../models");
const utils = require("../utils");
const appConfig = require("../app-config");

module.exports = {
    getRegister: function (req, res) {
        return res.render("register");
    },
    postRegister: function (req, res, next) {
        const { username, password, repeatPassword } = req.body;
        if (password !== repeatPassword) {
            res.render("register.hbs", {
                errors: {
                    repeatPassword: 'Passwords must be the same!'
                }
            });
            return;
        }

        return models.userModel.create({ username, password }).then(() => {
            res.redirect("/login");
        }).catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.render("register.hbs", {
                    errors: {
                        username: 'Username already exists!'
                    }
                });
                return;
            }
            next();
        });
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
