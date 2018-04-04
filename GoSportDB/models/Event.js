class Event {
    constructor(name, sport, datetime, location, admin, players){
        this.name = name;
        this.sport = sport;
        this.datetime = datetime;
        this.location = location;
        this.admin = admin;
        this.players = players;
    }
}
module.exports = Event;