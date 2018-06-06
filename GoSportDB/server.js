const express = require('express');
const app = express();
const { Router } = require('express');
const bodyParser = require('body-parser');
const router = new Router();
const Database = require('./database/mongodb');
const connectionstring = 'mongodb://gosport:h3ll0@ds227469.mlab.com:27469/gosport';
const database = new Database(connectionstring);
const UserRepository = require('./models/repositories/UserRepository');
const EventRepository = require('./models/repositories/EventRepository');
const MessageRepository = require('./models/repositories/MessageRepository');
const IdGenerator = require('./models/IdGenerator');
const usersRoute = require('./routes/users/users-route');
const eventRoute = require('./routes/events/events-route');
const messageRoute = require('./routes/messages/message-route');

const userRepository = new UserRepository(database, 'users');
const eventRepository = new EventRepository(database, 'events');
const messageRepository = new MessageRepository(database, 'messages');
const idGenerator = new IdGenerator(userRepository, eventRepository);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


usersRoute(app, userRepository, idGenerator);
eventRoute(app, eventRepository, userRepository, idGenerator);
messageRoute(app, messageRepository);

app.listen(process.env.PORT || 5000);