const { Router } = require('express');
const controller = require('./teams-controller');

const attach = (app, teamRepository) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            controller.showAllTeams(req, res, teamRepository);
        });

    app.use('/teams', router);

};

module.exports = attach;