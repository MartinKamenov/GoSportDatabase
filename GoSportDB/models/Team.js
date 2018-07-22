class Team {
    constructor(id, name, sport, players, pictureUrl, datetime) {
        this.id = id;
        this.name = name;
        this.sport = sport;
        this.players = players;
        this.pictureUrl = pictureUrl;
        this.datetime = datetime;
    }
}

module.exports = Team;