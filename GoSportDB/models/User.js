class User {
    constructor(email, id, username, password, city, profileImg) {
        this.email = email;
        this.id = id;
        this.username = username;
        this.password = password;
        this.city = city;
        this.profileImg = profileImg;
    }
}
module.exports = User;