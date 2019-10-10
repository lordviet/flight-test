const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const questions = require("../config/samples");
const userModel = require("../models/user");
const jwtConfig = require('../config/jwt');

// const tests = require("../config/database.json");


module.exports = {
    getIndex: function (req, res, next) {
        const token = req.cookies['auth_cookie'];
        if (!token) { return res.render('index'); }

        const data = jwt.verify(token, jwtConfig.secret);

        userModel.findOne({ _id: data.userId}).then(authUser => {
            if (!authUser) { res.status(401).send('please log in'); return; }

            req.user = authUser;

            return res.render('index', { isAuth: token !== null ? true : false, username: req.user.username });
        }); 
    },
    getQuestion: function (req, res) {
        // res.send(questions);
        return res.render("question", { questions });
    },
    getRegister: function(req, res) {
        return res.render("register");
    },
    postRegister: function(req, res, next) {
        const { username, password } = req.body;

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) { next(err); return; }

            userModel.create({ username, password: hash}).then(user => {
                console.log(user);
                res.redirect("/login");
            });
        })
    },
    getLogin: function(req, res) {
        return res.render("login");
    },
    postLogin: function(req, res, next) {

        userModel.findOne({ "username": req.body.username})
            .then(authUser => { 
                if (authUser === null) {
                    console.log('greshka');
                    return;
                }

                bcrypt.compare(req.body.password, authUser.password)
                    .then(result => {
                        if (!result) {
                            res.redirect("/");
                            return;
                        }

                        // sign() generates a new token
                        const token = jwt.sign({ userId: authUser._id}, jwtConfig.secret, jwtConfig.options);

                        res.cookie('auth_cookie', token).redirect('/');
                })
            });
    },
    logout: function(req, res) {
        res.clearCookie('auth_cookie').redirect('/');
    },
}
