const testController = require("../controllers/flightTest-controller");
const userController = require("../controllers/user-controller")
const { auth } = require('../utils');

module.exports = (app) => {
    
    app.get("/question", auth(false), testController.getQuestion);
    app.get("/categories", auth(), testController.getCategories);

    app.get("/register", auth(false), userController.getRegister);
    app.post("/register", auth(false), userController.postRegister);

    app.get("/login", auth(false), userController.getLogin);
    app.post("/login", auth(false), userController.postLogin);

    app.get("/logout", auth(), userController.logout);
    app.get("/", auth(false), testController.getIndex);
    app.get("*", auth(false), testController.getNotFound);

    // this route is for testing only
    // app.get("/question/:id", controller);
    // another testing route
    // app.get("/about", controller);
};