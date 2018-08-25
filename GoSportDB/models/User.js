class User {
    constructor(email, id, username, password, city, profileImg, teams, events, token) {
        this.email = email;
        this.id = id;
        this.username = username;
        this.password = password;
        this.city = city;
        this.profileImg = profileImg;
        this.teams = teams;
        this.events = events;
        this.token = token;
    }
}
module.exports = User;