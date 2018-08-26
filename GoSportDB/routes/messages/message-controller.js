const MessageCollection = require('../../models/MessageCollection');
const Message = require('../../models/Message');
const dateTime = require('../../models/DateTime');
const notificationService = require('../../models/services/notificationService');

let messageCollections = [];

const controller = {
    showMessages(req, res, messageRepository) {
        const paramId = +req.params.id;
        if (!paramId) {
            res.send('Error: No Id provided');
            return;
        }

        let messageCollection = messageCollections.find((c) => c.id === paramId);

        if (!messageCollection) {
            messageRepository.findMessageCollectionById(paramId).then((foundMessageCollections) => {
                if (foundMessageCollections.length < 1) {
                    messageCollection = new MessageCollection(paramId);
                    messageRepository.insertMessageCollection(messageCollection).then(() => {
                        messageCollections.push(messageCollection);
                        res.send(messageCollection);
                        return;
                    });
                } else if (foundMessageCollections.length === 1) {
                    messageCollection = foundMessageCollections[0];
                    messageCollections.push(messageCollection);
                } else {
                    res.send('Error: More than one message collection found.');
                    return;
                }

                res.send(messageCollection);
                return;

            });
        } else {
            res.send(messageCollection);
            return;
        }
    },

    addMessage(req, res, messageRepository) {
        const paramId = +req.params.id;
        if (!paramId) {
            res.send('Error: No Id provided');
            return;
        }

        const username = req.body.username;
        const text = req.body.text;
        const profileImg = req.body.profileImg;
        const token = req.body.token;

        let date = new Date();
        dateTime.year = date.getFullYear();
        dateTime.month = date.getMonth();
        dateTime.dayOfMonth = date.getDate();
        dateTime.hour = date.getHours();
        dateTime.minute = date.getMinutes();
        const message = new Message(username, text, dateTime, profileImg, token);

        let messageCollection = messageCollections.find((c) => c.id === paramId);
        if (!messageCollection) {
            messageRepository.findMessageCollectionById(paramId).then((foundMessageCollections) => {
                messageCollection = foundMessageCollections[0];
                messageCollection.collection.push(message);
                messageCollections.push(messageCollection);
                messageRepository.removeMessageCollection(paramId).then(() => {
                    messageRepository.insertMessageCollection(messageCollection).then(() => {
                        this.notifyOtherUsers(messageCollection, message);
                        res.send(messageCollection);
                        return;
                    });
                });
            });
        } else {
            messageCollection.collection.push(message);
            messageRepository.removeMessageCollection(paramId).then(() => {
                messageRepository.insertMessageCollection(messageCollection).then(() => {
                    this.notifyOtherUsers(messageCollection, message);
                    res.send(messageCollection);
                    return;
                });
            });
        }
    },
    notifyOtherUsers(messageCollection, message) {
        const collection = messageCollection.collection;

        const uniqueTokens = collection.map((m) => m.token)
            .filter(function(value, index, self) {
                return self.indexOf(value) === index;
            }).filter((token) => { return (token !== message.token && token); });

        notificationService.createAndSendMessages(message.username, message.text, uniqueTokens);
    }
}

module.exports = controller;