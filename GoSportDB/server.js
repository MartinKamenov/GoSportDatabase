const express = require('express');
const app = express();
const { Router } = require('express');
const router = new Router();
const Database = require('./database/mongodb');
const connectionstring = 'mongodb://gosport:h3ll0@ds227469.mlab.com:27469/gosport';
const database = new Database(connectionstring);
const usersRoute = require('./routes/users/users-route');

usersRoute(app, database);

app.listen(5000, () =>
    console.log(`Magic is running at 5000`));
