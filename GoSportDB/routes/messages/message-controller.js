const messages = [];

const controller = {
    showMessages(req, res) {
        res.send(messages);
    },

    addMessage(req, res) {
        const message = req.body.message;
        messages.push(message);
        showMessages(req, res);
    }
}

module.exports = controller;