class IdGenerator {
    constructor(userRepository, eventRepository, teamRepository) {
        userRepository.getAllUsers()
            .then((users) => {
                if (users.length == 0) {
                    this.userId = 0;
                } else {
                    const sortedUsers = users.sort((a, b) => b.id - a.id);
                    this.userId = +sortedUsers[0].id;
                }
            });
        eventRepository.getAllEvents()
            .then((events) => {
                if (events.length == 0) {
                    this.eventId = 0;
                } else {
                    const sortedEvents = events.sort((a, b) => b.id - a.id);
                    this.eventId = +sortedEvents[0].id;
                }
            });
        teamRepository.getAllTeams()
            .then((teams) => {
                if (teams.length == 0) {
                    this.teamId = 0;
                } else {
                    const sortedTeams = teams.sort((a, b) => b.id - a.id);
                    this.teamId = +sortedTeams[0].id;
                }
            });
    }

    getUserId() {
        return ++this.userId;
    }
    getEventId() {
        return ++this.eventId;
    }
    getTeamId() {
        return ++this.teamId;
    }
}

module.exports = IdGenerator;