const { Router } = require('express');
const controller = require('./locations-controller');

const attach = (app, customLocationRepository, idGenerator) => {
    const router = new Router();
    router
        .get('/', (req, res) => {
            controller.showAllCustomLocations(req, res, customLocationRepository);
        });
    app.use('/locations', router);
}

module.exports = attach;