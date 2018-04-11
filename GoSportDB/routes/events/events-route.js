const { Router } = require('express');
const controller = require('./events-controller');
const attach = (app, eventRepository, idGenerator) => {
    const router = new Router();
    router
    .post('/createEvent', (req, res) => {
        controller.createEvent(req, res, eventRepository, idGenerator);
    });
}