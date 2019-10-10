const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const path = require('path');

module.exports = (app) => {
    // setting up the view engine
    app.engine('.hbs', handlebars({
        defaultLayout: 'main',
        extname: '.hbs',
        partialsDir: __basedir + '/views/partials/'
    }));

    // setting up the body parser
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(cookieParser());

    app.set('view engine', '.hbs');

    // setting up the static files
    app.use(express.static("static"));
    require('../config/routes')(app);
};