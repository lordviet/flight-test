const controller = require('../controllers/flightTest-controller');

module.exports = (app) => {
    app.get("/", controller.getIndex);
    app.get("/question", controller.getQuestion);
    // this route is for testing only
    app.get("/question/:id", controller);
};