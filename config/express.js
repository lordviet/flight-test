const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

module.exports = (app) => {
    // setting up the view engine
    app.engine('.hbs', handlebars({
        defaultLayout: 'main',
        extname: '.hbs'
    }));

    // setting up the body parser
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.set('view engine', '.hbs');

    // setting up the static files
    app.use(express.static("static"));
    require('../config/routes')(app);
};