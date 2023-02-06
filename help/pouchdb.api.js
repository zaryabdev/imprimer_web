const PouchDB = require("pouchdb");
const namor = require("namor");
const { v4: uuidv4 } = require("uuid");

const db = new PouchDB("pouchdb_100");
const db2 = new PouchDB("pouchdb_200");
const log = (data) => console.log(data);

// var changes = db
//     .changes({
//         since: "now",
//         live: true,
//         include_docs: true,
//     })
//     .on("change", function (change) {
//         // handle change
//     })
//     .on("complete", function (info) {
//         // changes() was canceled
//     })
//     .on("error", function (err) {
//         console.log(err);
//     });
// changes.cancel();

async function createdDoc() {
    const id = uuidv4();
    const name = namor.generate({ words: 2, saltLength: 0 });
    log(id);
    log(name);
    try {
        var response = await db.put({
            _id: id,
            name: name,
        });

        log(response);
    } catch (err) {
        log(err);
    }
}
// createdDoc();

async function updateDoc() {
    const name = namor.generate({ words: 2, saltLength: 0 });
    log(name);
    try {
        var doc = await db.get("bebd236f-3a1c-4832-9197-cdef91ee142d");
        log(doc);

        var response = await db.put({
            _id: doc._id,
            _rev: doc._rev,
            name: name,
        });

        log(response);
    } catch (err) {
        console.log(err);
    }
}

// updateDoc();

async function createdDocByPost() {
    const name = namor.generate({ words: 2, saltLength: 0 });
    log(name);
    try {
        var response = await db.post({
            name: name,
        });

        log(response);
    } catch (err) {
        log(err);
    }
}

// createdDocByPost();

async function getDoc() {
    try {
        var response = await db.get("74b64661-ec10-40e5-8390-0922f58e4428");

        log(response);
    } catch (err) {
        log(err);
    }
}
// getDoc();

async function deleteDoc() {
    try {
        var doc = await db.get("74b64661-ec10-40e5-8390-0922f58e4428");
        var response = await db.remove(doc);
        log(response);
    } catch (err) {
        log(err);
    }
}

// deleteDoc();

// Note that bulkDocs() is not transactional, and that you may get back a mixed array of errors/non-errors. In CouchDB/PouchDB, the smallest atomic unit is the document.
async function createdBulkDocs() {
    try {
        var response = await db.bulkDocs([
            {
                _id: uuidv4(),
                name: namor.generate({ words: 2, saltLength: 0 }),
            },
            {
                _id: uuidv4(),
                name: namor.generate({ words: 2, saltLength: 0 }),
            },
        ]);

        log(response);
    } catch (err) {
        log(err);
    }
}

// createdBulkDocs();

async function updateBulkDocs() {
    try {
        var response = await db.bulkDocs([
            {
                _id: "38cf05f8-53e0-4c76-93d4-18e4d3610212",
                _rev: "1-02592342966b73a3e8a17a420e8b8dfd",
                name: namor.generate({ words: 2, saltLength: 0 }),
            },
            {
                _id: "9fd2c254-03b4-42bf-bc1d-bb74e67bbb26",
                _rev: "1-16e999b3a9e55c70a49b61944511978a",
                name: namor.generate({ words: 2, saltLength: 0 }),
            },
        ]);

        log(response);
    } catch (err) {
        log(err);
    }
}

// updateBulkDocs();

async function bulkDeleteDocs() {
    try {
        var response = await db.bulkDocs([
            {
                _id: "38cf05f8-53e0-4c76-93d4-18e4d3610212",
                _rev: "1-02592342966b73a3e8a17a420e8b8dfd",
                _deleted: true,
            },
            {
                _id: "9fd2c254-03b4-42bf-bc1d-bb74e67bbb26",
                _rev: "1-16e999b3a9e55c70a49b61944511978a",
                _deleted: true,
            },
        ]);

        log(response);
    } catch (err) {
        log(err);
    }
}

// bulkDeleteDocs();

async function bulkFetchDocs() {
    try {
        var result = await db.allDocs({
            include_docs: true,
            attachments: true,
            // startkey: "38cf05f8-53e0-4c76-93d4-18e4d3610212",
            // endkey: "9fd2c254-03b4-42bf-bc1d-bb74e67bbb26",
        });

        log(result);
    } catch (err) {
        log(err);
    }
}

async function bulkFetchDocs2() {
    try {
        var result = await db2.allDocs({
            include_docs: true,
        });

        log(result);
    } catch (err) {
        log(err);
    }
}

log("Before rep");
// bulkFetchDocs();
bulkFetchDocs2();

async function replicateDb() {
    var rep = PouchDB.replicate("db", "db2", {
        live: true,
        retry: true,
    })
        .on("change", function (info) {
            log(info);
        })
        .on("paused", function (err) {
            // replication paused (e.g. replication up to date, user went offline)
            log(err);
        })
        .on("active", function () {
            // replicate resumed (e.g. new changes replicating, user went back online)
        })
        .on("denied", function (err) {
            // a document failed to replicate (e.g. due to permissions)
        })
        .on("complete", function (info) {
            log("After rep complete");
            bulkFetchDocs2();
            log(info);
        })
        .on("error", function (err) {
            log(err);
        });
}
// replicateDb();

async function replicateDb2() {
    try {
        var result = await db.replicate.to(db2);
        log(result);
        log("After rep complete");
        bulkFetchDocs2();
    } catch (err) {
        console.log(err);
    }
}

// replicateDb2();

// rep.cancel();
