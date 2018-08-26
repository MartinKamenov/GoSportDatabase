var FCM = require('fcm-node');
var serverKey = 'AAAAq1x7OXo:APA91bGEa3SZPoGmnlKpE_JrhbMexxm2opHgwLtqvob6OpBPbgo6_RotRNo1raL10zk1w8N2d-fYYVeL321PXAx3XCRdFwhqvtZSQVcaDsj8_UYq-F-KRF6uODPRRRGujZwed3zTPRNu'; //put your server key here
var fcm = new FCM(serverKey);

const service = {
    createAndSendMessage(title, body, token) {
        var message = {
            to: token,
            notification: { title, body }
        };

        this.sendMessage(message);
    },

    createAndSendMessages(title, body, tokens) {
        var message = {
            registration_ids: tokens,
            notification: { title, body }
        };

        this.sendMessage(message);
    },

    sendMessage(message) {
        fcm.send(message, function(err, response) {
            if (err) {
                console.log("Something has gone wrong!");
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });
    }
}

module.exports = service;