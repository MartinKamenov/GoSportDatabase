const { Router } = require('express');
const controller = require('./message-controller');

const attach = (app, MessageRepository) => {
    const router = new Router();

    router
        .get('/:id', (req, res) => {
            controller.showMessages(req, res, MessageRepository);
        })
        .post('/:id/addMessage', (req, res) => {
            controller.addMessage(req, res, MessageRepository);
        })

    app.use('/messages', router);

};

module.exports = attach;