const { Router } = require('express');
const controller = require('./message-controller');

const attach = (app) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            controller.showMessages(req, res);
        })
        .post('/addMessage', (req, res) => {
            controller.addMessage(req, res);
        })

    app.use('/messages', router);

};

module.exports = attach;