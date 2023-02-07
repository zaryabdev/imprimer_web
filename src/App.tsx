import namor from "namor";
import {
    adjectives,
    animals,
    colors,
    Config,
    uniqueNamesGenerator,
} from "unique-names-generator";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const PouchDB = window.PouchDB;
const db = new PouchDB("pouchdb_web");
const log = (data) => console.log(data);

const customConfig: Config = {
    dictionaries: [adjectives, colors],
    separator: "-",
    length: 2,
};

const randomName: string = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
});

const shortName = uniqueNamesGenerator(customConfig);

function App() {
    async function createdDoc() {
        const id = uuidv4();
        const name = "Xaryab";
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

    async function updateDoc() {
        const name = shortName;
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
                    name: shortName,
                },
                {
                    _id: uuidv4(),
                    name: shortName,
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
                    name: shortName,
                },
                {
                    _id: "9fd2c254-03b4-42bf-bc1d-bb74e67bbb26",
                    _rev: "1-16e999b3a9e55c70a49b61944511978a",
                    name: shortName,
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

    return (
        <div>
            <div>App is live</div>
            <div>
                <button onClick={createdDoc}>Create Doc</button>{" "}
            </div>
            <div>
                <button onClick={createdBulkDocs}>Create Multi Doc</button>{" "}
            </div>
            <div>
                <button onClick={bulkFetchDocs}>Batch fetch Doc</button>{" "}
            </div>
        </div>
    );
}

export default App;
