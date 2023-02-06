import namor from "namor";
import PouchDB from "pouchdb";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const db = new PouchDB("pouchdb_1");
const log = (data) => console.log(data);

function App() {
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

    return (
        <div>
            <button onClick={createdDoc}>Create Doc</button>
        </div>
    );
}

export default App;
