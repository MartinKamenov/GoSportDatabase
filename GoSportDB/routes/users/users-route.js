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
        .get('/users', (req, res) => {
            controller.showUsers(req, res, userRepository);
        });
        
    app.use('/', router);
};

module.exports = attach;
