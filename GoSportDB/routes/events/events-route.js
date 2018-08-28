const { Router } = require('express');
const controller = require('./events-controller');
const attach = (app, eventRepository, userRepository, teamRepository, idGenerator) => {
    const router = new Router();
    router
        .get('/', (req, res) => {
            controller.showEvents(req, res, eventRepository);
        })
        .get('/:id', (req, res) => {
            controller.showEvent(req, res, eventRepository);
        })
        .post('/createEvent', (req, res) => {
            controller.createEvent(req, res, eventRepository, userRepository, teamRepository, idGenerator);
        })
        .post('/:id/addUserToEvent', (req, res) => {
            controller.addUserToEvent(req, res, eventRepository, userRepository);
        });
    app.use('/events', router);
}

module.exports = attach;