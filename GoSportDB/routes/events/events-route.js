const { Router } = require('express');
const controller = require('./events-controller');
const attach = (app, eventRepository, idGenerator) => {
    const router = new Router();
    router
        .get('/', (req, res) => {
            controller.showEvents(req, res, eventRepository);
        })
        .get('/:id', (req, res) => {
            controller.showEvent(req, res, eventRepository);
        })
        .post('/createEvent', (req, res) => {
            controller.createEvent(req, res, eventRepository, idGenerator);
        })
        .post('/addUserToEvent', (req, res) => {
            controller.addUserToEvent(req, res, eventRepository);
        });
    app.use('/events', router);
}

module.exports = attach;