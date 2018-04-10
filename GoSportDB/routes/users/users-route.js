const { Router } = require('express');
const controller = require('./users-controller');

const attach = (app, userRepository) => {
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
            controller.register(req, res, userRepository)});
        
    app.use('/', router);
};

module.exports = attach;
