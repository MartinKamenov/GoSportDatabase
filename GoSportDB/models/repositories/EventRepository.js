class EventRepository{
    constructor(database, collectionName) {
        this.collectionName = collectionName;
        this.database = database;
    }
    getAllEvents() {
        return this.database.showAll(this.collectionName);
    }
    insertEvent(event) {
        return this.database.insert(this.collectionName, event);
    }
    findEventByCode(code) {
        return this.database.find(this.collectionName, { code: code });
    }

    findEventByParams(params) {
        return this.database.find(this.collectionName, params);
    }

    removeEvent(code) {
        return this.database.delete(this.collectionName, { code: code });
    }
}

module.exports = EventRepository;
