const controller = require('../controllers/flightTest-controller');

module.exports = (app) => {
    app.get("/", controller.getIndex);
    app.get("/question", controller.getQuestion);

    app.get("/register", controller.getRegister);
    app.post("/register", controller.postRegister);

    app.get("/login", controller.getLogin);
    app.post("/login", controller.postLogin);
    // this route is for testing only
    // app.get("/question/:id", controller);
    // another testing route
    // app.get("/about", controller);
};