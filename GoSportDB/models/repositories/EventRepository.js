class EventRepository {
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
    findEventByParams(params) {
        return this.database.find(this.collectionName, params);
    }
    findEventById(id) {
        return this.database.find(this.collectionName, { id });
    }

    removeEvent(id) {
        return this.database.delete(this.collectionName, { id });
    }
}

module.exports = EventRepository;