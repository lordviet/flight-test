const controller = require('../controllers/flightTest-controller');

module.exports = (app) => {
    app.get("/", controller.getIndex);
    app.get("/question", controller.getQuestion);
};