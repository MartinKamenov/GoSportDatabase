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
        .get('/:id', (req, res) => {
            controller.showTeam(req, res, teamRepository);
        });

    app.use('/teams', router);

};

module.exports = attach;