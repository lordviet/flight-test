const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const secret = 'secret';

module.exports = (app) => {
    
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(cookieParser(secret));

    // setting up the view engine
    app.engine(".hbs", handlebars({
        defaultLayout: "main",
        extname: ".hbs",
        layoutsDir: __basedir + "/views/layouts/",
        partialsDir: __basedir + "/views/partials/"
    }));

    app.set("view engine", ".hbs");

    // setting up the static files
    app.use(express.static("static"));    
    require("../config/routes")(app);
};