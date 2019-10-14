const jwt = require("./jwt");
const appConfig = require("../app-config");
const models = require('../models');

// TO DO AUTH FUNCTION
function auth(unauthenticated = true) {
    return function(req, res, next) {
        const token = req.cookies[appConfig.authCookieName] || '';
        Promise.all([
            jwt.verifyToken(token),
            models.tokenBlacklistModel.findOne({ token })
        ]).then(([data, blacklistedToken]) => {
            if (blacklistedToken) {
                return Promise.reject(new Error('token is blacklisted'));
            }
            models.userModel.findById(data.id).then(user => {
                req.user = user;
                next();
            })
        }).catch(err => {
            if (!unauthenticated) { next(); return; }
            if (['token expired',
                'token is blacklisted',
                'jwt must be provided']
                .includes(err.message)) {
                res.redirect('/login');
            }
            next(err);
        });
    }
}

module.exports = auth;