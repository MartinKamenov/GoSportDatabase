class UserRepository {
    constructor(database, collectionName) {
        this.collectionName = collectionName;
        this.database = database;
    }
    getAllUsers() {
        return this.database.showAll(this.collectionName);
    }

    insertUser(user) {
        return this.database.insert(this.collectionName, user);
    }

    findUserById(id) {
        return this.database.find(this.collectionName, { id });
    }

    findUserByParams(params) {
        return this.database.find(this.collectionName, params);
    }

    removeUser(id) {
        return this.database.delete(this.collectionName, { id });
    }
}

module.exports = UserRepository;