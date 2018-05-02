class IdGenerator {
    constructor(userRepository, eventRepository) {
        userRepository.getAllUsers()
        .then((users)=>{
            if(users.length==0) {
                this.userId = 0;
            } else {
                this.userId = +users[users.length - 1].id;
            }
            eventRepository.getAllEvents()
            .then((events)=>{
                if(events.length==0) {
                    this.eventId = 0;
                } else {
                    this.eventId = +events[events.length - 1].id;
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