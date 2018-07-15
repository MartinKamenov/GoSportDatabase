const express = require('express');
const app = express();
const path = require('path');
const { Router } = require('express');
const bodyParser = require('body-parser');
const Database = require('./database/mongodb');
const connectionstring = 'mongodb://gosport:h3ll0@ds227469.mlab.com:27469/gosport';
const database = new Database(connectionstring);
const UserRepository = require('./models/repositories/UserRepository');
const EventRepository = require('./models/repositories/EventRepository');
const MessageRepository = require('./models/repositories/MessageRepository');
const TeamRepository = require('./models/repositories/TeamsRepository');
const IdGenerator = require('./models/IdGenerator');
const usersRoute = require('./routes/users/users-route');
const eventsRoute = require('./routes/events/events-route');
const messageRoute = require('./routes/messages/message-route');
const teamsRoute = require('./routes/teams/teams-route');

const userRepository = new UserRepository(database, 'users');
const eventRepository = new EventRepository(database, 'events');
const messageRepository = new MessageRepository(database, 'messages');
const teamRepository = new TeamRepository(database, 'teams');
const idGenerator = new IdGenerator(userRepository, eventRepository);

app.use(express.static(__dirname + '../'));
app.use('/static', express.static(path.join(__dirname, './static')));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

usersRoute(app, userRepository, idGenerator);
eventsRoute(app, eventRepository, userRepository, idGenerator);
messageRoute(app, messageRepository);
teamsRoute(app, teamRepository);

app.listen(process.env.PORT || 5000);