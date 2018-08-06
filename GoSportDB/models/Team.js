class Team {
    constructor(id, name, sport, players, requestingPlayers, pictureUrl, datetime) {
        this.id = id;
        this.name = name;
        this.sport = sport;
        this.players = players;
        this.requestingPlayers = requestingPlayers;
        this.pictureUrl = pictureUrl;
        this.datetime = datetime;
    }
}

module.exports = Team;