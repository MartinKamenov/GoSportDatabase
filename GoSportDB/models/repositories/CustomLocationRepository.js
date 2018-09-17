class CustomLocationRepository {
    constructor(database, collectionName) {
        this.collectionName = collectionName;
        this.database = database;
    }

    getAllCustomLocations() {
        return this.database.showAll(this.collectionName);
    }

    insertCustomLocation(customLocation) {
        return this.database.insert(this.collectionName, customLocation);
    }

    removeCustomLocation(id) {
        return this.database.delete(this.collectionName, { id });
    }
}

module.exports = CustomLocationRepository;