class Event {
    constructor(id, name, sport, datetime, location, admin, neededPlayers, players) {
        this.id = id;
        this.name = name;
        this.sport = sport;
        this.datetime = datetime;
        this.location = location;
        this.admin = admin;
        this.neededPlayers = neededPlayers;
        this.players = players;
    }
}
module.exports = Event;