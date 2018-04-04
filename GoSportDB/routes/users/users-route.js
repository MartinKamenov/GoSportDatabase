const { Router } = require('express');
const controller = require('./users-controller');

const attach = (app, database) => {
    // @ts-ignore
    const router = new Router();
    router
        .get('/', (req, res) => {
            database.showAll('users').then((u) => {
                res.send(u);
            });
        });
    app.use('/', router);
};

module.exports = attach;
