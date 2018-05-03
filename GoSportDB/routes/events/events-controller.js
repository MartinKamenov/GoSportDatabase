const Event = require('../../models/Event');
const Location = require('../../models/Location');
const controller = {
    showEvents(req, res, eventRepository) {
        eventRepository.getAllEvents()
            .then((events) => {
                res.send(events);
                return;
            })
            .catch(() => {
                res.send("Error");
                return;
            });
    },
    showEvent(req, res, eventRepository) {
        const id = req.params.id;
        eventRepository.findEventByParams({ id }).then((events) => {
            if (events.length < 1) {
                res.send("No event with id: " + id);
                return;
            } else if (events.length > 1) {
                res.send("More than one event with id: " + id);
                return;
            }

            res.send(events[0]);
        });
        //const events = await Promise.resolve(eventRepository.findEventByParams.bind(eventRepository));
    },
    createEvent(req, res, eventRepository, idGenerator) {
        const id = idGenerator.getEventId();
        const name = req.body.name;
        const sport = req.body.sport;
        const year = +req.body.year;
        const month = +req.body.month;
        const day = +req.body.day;
        const hours = +req.body.hours;
        const minutes = +req.body.minutes;
        const datetime = new Date(year, month, day, hours, minutes);
        const longitude = +req.body.longitude;
        const latitude = +req.body.latitude;
        const location = new Location(longitude, latitude);
        const adminId = req.body.adminId;
        const neededPlayers = +req.body.neededPlayers;
        const players = [];
        players.push(adminId);
        const event = new Event(id, name, sport, datetime,
            location, adminId, neededPlayers,
            players);
        eventRepository.findEventByParams({ location, sport, datetime })
            .then((events) => {
                if (events.length > 0) {
                    res.send("Event already exists");
                    return;
                }
                eventRepository.insertEvent(event)
                    .then(() => {
                        res.send("Successful");
                        return;
                    })
                    .catch(() => {
                        res.send("Error");
                        return;
                    });
            })
    },
    addUserToEvent(req, res, eventRepository) {
        const userId = req.body.userId;
        const eventId = req.params.id;
        eventRepository.findEventByParams({ id: eventId }).then((events) => {
            if (events.length == 0) {
                res.send("No event with id: " + eventId);
                return;
            } else if (events.length > 1) {
                res.send("More than one event with id: " + eventId);
                return;
            }

            const event = events[0];
            if (event.neededPlayers == -1 ||
                event.neededPlayers < event.players.length) {
                for (let i = 0; i < event.players.length; i += 1) {
                    if (event.players[i] == userId) {
                        res.send('Already in the event');
                        return;
                    }
                }
                event.players.push(userId);
                eventRepository.removeEvent(eventId).then(() => {
                    eventRepository.insertEvent(event).then(() => {
                        res.send('Successfull');
                        return;
                    });
                });
            } else {
                res.send('Maximum players reached');
            }
        });
    },
    deleteEvent(req, res, eventRepository) {
        eventRepository.removeEvent(id)
            .then(() => {
                res.send("Event deleted");
                return;
            })
    }
}

module.exports = controller;