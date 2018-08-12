const { Router } = require('express');
const controller = require('./teams-controller');

const attach = (app, teamRepository, userRepository, idGenerator) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            controller.showAllTeams(req, res, teamRepository);
        })
        .post('/addTeam', (req, res) => {
            controller.addTeam(req, res, teamRepository, userRepository, idGenerator);
        })
        .post('/request/:id', (req, res) => {
            controller.requestJoin(req, res, teamRepository, userRepository);
        })
        .post('/join/:id', (req, res) => {
            controller.joinPlayer(req, res, teamRepository, userRepository);
        })
        .post('/reject/:id', (req, res) => {
            controller.rejectPlayer(req, res, teamRepository, userRepository);
        })
        .get('/:id', (req, res) => {
            controller.showTeam(req, res, teamRepository);
        });

    app.use('/teams', router);
};

module.exports = attach;