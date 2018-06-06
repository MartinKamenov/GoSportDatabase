class MessageCollection {
    constructor(id) {
        this.id = id;
        this.collection = [];
    }

    addMessage(message) {
        this.collection.push(message);
    }

    clearCollection() {
        this.collection = [];
    }
}

module.exports = MessageCollection;