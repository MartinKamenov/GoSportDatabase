class Message {
    constructor(username, text, dateTime, profileImg, token) {
        this.username = username;
        this.text = text;
        this.dateTime = dateTime;
        this.profileImg = profileImg;
        this.token = token;
    }
}

module.exports = Message;