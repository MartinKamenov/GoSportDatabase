const { MongoClient } = require('mongodb');
const ObjectID = require('mongodb').ObjectID;

const database = class Database {
    constructor(connectionString) {
        this.connectionString = connectionString;
        this.connection = new Promise((resolve, reject) => {
            resolve(MongoClient.connect(this.connectionString));
        });
    }

    insert(collection, record) {
        return new Promise((resolve, reject) => {
            this.connection
                .then((db) => {
                    const insertCollection = db.collection(collection);
                    insertCollection.insert(record);
                    resolve(insertCollection
                        .find()
                        .toArray());
                })
                .catch((ex) => {
                    reject(ex);
                });
        });
    }

    update(collection, filter, record) {
        return new Promise((resolve, reject) => {
            this.connection
                .then((db) => {
                    const updateCollection = db.collection(collection);
                    updateCollection.update(filter, record);
                    resolve(updateCollection
                        .find()
                        .toArray());
                })
                .catch((ex) => {
                    reject(ex);
                });
        });
    }

    showAll(collection) {
        return new Promise((resolve, reject) => {
            this.connection
                .then((db) => {
                    const showCollection = db.collection(collection)
                        .find()
                        .toArray();
                    resolve(showCollection);
                })
                .catch((ex) => {
                    reject(ex);
                });
        });
    }

    find(collection, filter) {
        return new Promise((resolve, reject) => {
            this.connection
                .then((db) => {
                    const findCollection = db.collection(collection)
                        .find(filter)
                        .toArray();
                    resolve(findCollection);
                })
                .catch((ex) => {
                    reject(ex);
                });
        });
    }

    findOne(collection, filter) {
        return new Promise((resolve, reject) => {
            this.connection
                .then((db) => {
                    const found = db.collection(collection)
                        .findOne(filter);
                    resolve(found);
                })
                .catch((ex) => {
                    reject(ex);
                });
        });
    }

    findById(collection, id) {
        const objectId = new ObjectID(id);
        return new Promise((resolve, reject) => {
            this.connection
                .then((db) => {
                    const findCollection = db.collection(collection)
                        .find({ '_id': objectId })
                        .toArray();
                    resolve(findCollection);
                })
                .catch((ex) => {
                    reject(ex);
                });
        });
    }

    delete(collection, filter) {
        return new Promise((resolve, reject) => {
            this.connection
                .then((db) => {
                    const deleteCollection = db.collection(collection);
                    deleteCollection.deleteMany(filter);
                    resolve(deleteCollection
                        .find()
                        .toArray());
                })
                .catch((ex) => {
                    reject(ex);
                });
        });
    }

    deleteAll(collection) {
        return new Promise((resolve, reject) => {
            this.connection
                .then((db) => {
                    const deleteCollection = db.collection(collection);
                    deleteCollection.deleteMany({});
                    resolve(deleteCollection
                        .find()
                        .toArray());
                })
                .catch((ex) => {
                    reject(ex);
                });
        });
    }
};

module.exports = database;
