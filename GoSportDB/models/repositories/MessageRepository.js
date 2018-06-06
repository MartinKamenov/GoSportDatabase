class MessageRepository {
    constructor(database, collectionName) {
        this.collectionName = collectionName;
        this.database = database;
    }
    getAllMessageCollections() {
        return this.database.showAll(this.collectionName);
    }

    insertMessageCollection(messageCollection) {
        return this.database.insert(this.collectionName, messageCollection);
    }

    findMessageCollectionById(id) {
        return this.database.find(this.collectionName, { id });
    }

    removeMessageCollection(id) {
        return this.database.delete(this.collectionName, { id });
    }
}

module.exports = MessageRepository;