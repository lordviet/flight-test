const testController = require("../controllers/flightTest-controller");
const userController = require("../controllers/user-controller")
const { auth } = require('../utils');

module.exports = (app) => {
    
    app.get("/question", auth(), testController.getQuestion);

    app.get("/register", userController.getRegister);
    app.post("/register", userController.postRegister);

    app.get("/login", userController.getLogin);
    app.post("/login", userController.postLogin);

    app.get("/logout", userController.logout);
    app.get("/", auth(false), testController.getIndex);
    app.get("*", testController.getNotFound);
    // Add 404 page
    // this route is for testing only
    // app.get("/question/:id", controller);
    // another testing route
    // app.get("/about", controller);
};