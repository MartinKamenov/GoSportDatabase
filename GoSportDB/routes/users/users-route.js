const { Router } = require('express');
const controller = require('./users-controller');

const attach = (app, userRepository, idGenerator) => {
    // @ts-ignore
    const router = new Router();
    router
        .get('/', (req, res) => {
            controller.showHome(res);
        })
        .post('/login', (req, res) => {
            controller.login(req, res, userRepository);
        })
        .post('/register', (req, res) => {
            controller.register(req, res, userRepository, idGenerator);
        })
        .get('/users/:id', (req, res) => {
            controller.showUser(req, res, userRepository);
        })
        .get('/users/:id/teams', (req, res) => {
            controller.showUserTeams(req, res, userRepository);
        })
        .post('/facebooklogin', (req, res) => {
            controller.facebookLogin(req, res, userRepository, idGenerator);
        });

    app.use('/', router);
};

module.exports = attach;