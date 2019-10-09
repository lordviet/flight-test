const bcrypt = require("bcrypt");
const questions = require("../config/samples");
const userModel = require("../models/user");

// const tests = require("../config/database.json");


module.exports = {
    getIndex: function (req, res) {
        return res.render("index");
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

                        //da se vkarat jwt i cookies
                        console.log('stana li????');
                        res.redirect("/vlezee");
                })
            });
    }
}

function authenticate(err, result) {
    if (err) { console.error(err); return; }

    if (null !== result) {
        return true;
    } else {
        return false;
    }
}