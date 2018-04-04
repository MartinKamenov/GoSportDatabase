class UserRepository {
    constructor(database, collectionName) {
        this.collectionName = collectionName;
        this.database = database;
    }
    getAllUsers() {
        return this.database.showAll(this.collectionName);
    }

    insertUser(property) {
        return this.database.insert(this.collectionName, property);
    }

    findUserByCode(code) {
        return this.database.find(this.collectionName, { code: code });
    }

    findUserByParams(params) {
        return this.database.find(this.collectionName, params);
    }

    removeUser(code) {
        return this.database.delete(this.collectionName, { code: code });
    }
}

module.exports = PropertyRepository;
