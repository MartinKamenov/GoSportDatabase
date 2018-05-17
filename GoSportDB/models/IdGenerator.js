class IdGenerator {
    constructor(userRepository, eventRepository) {
        userRepository.getAllUsers()
            .then((users) => {
                if (users.length == 0) {
                    this.userId = 0;
                } else {
                    const sortedUsers = users.sort(a, b => b.id - a.id);
                    this.userId = +sortedUsers[sortedUsers.length - 1].id;
                }
                eventRepository.getAllEvents()
                    .then((events) => {
                        if (events.length == 0) {
                            this.eventId = 0;
                        } else {
                            const sortedEvents = events.sort(a, b => b.id - a.id);
                            this.eventId = +sortedEvents[sortedEvents.length - 1].id;
                        }
                    })
            });
    }

    getUserId() {
        return ++this.userId;
    }
    getEventId() {
        return ++this.eventId;
    }
}

module.exports = IdGenerator;