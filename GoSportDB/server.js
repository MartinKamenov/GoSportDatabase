const express = require('express');
const app = express();
const { Router } = require('express');
const bodyParser = require('body-parser');
const router = new Router();
const Database = require('./database/mongodb');
const connectionstring = 'mongodb://gosport:h3ll0@ds227469.mlab.com:27469/gosport';
const database = new Database(connectionstring);
const usersRoute = require('./routes/users/users-route');
const UserRepository = require('./models/repositories/UserRepository');

const userRepository = new UserRepository(database, 'users');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


usersRoute(app, userRepository);

app.listen(process.env.PORT || 5000);
