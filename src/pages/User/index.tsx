import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const PouchDB = window.PouchDB;
// const dbsplugin = window.pouch__all_dbs__;

// PouchDB.plugin(dbsplugin);
const db = new PouchDB("pouchdb_web");
const db2 = new PouchDB("pouchdb_web_2");
const log = (data) => console.log(data);

const initialState = {
    id: "",
    key: "",
    doc: {
        _id: "",
        _rev: "",
        username: "",
        password: "",
    },
    value: {
        rev: "",
    },
};

const User: React.FC = () => {
    const [userList, setUserList] = useState([]);
    const [selectedUser, setSelectedUser] = useState(initialState);
    useEffect(() => {
        getAllDocs()
            .then((data) => {
                setUserList(data.rows);
            })
            .catch((err) => {
                log(err);
            });

        // PouchDB.allDbs()
        //     .then((dbs) => log(dbs))
        //     .catch((err) => log(err));
    }, []);

    // useEffect(() => {
    //     log("selectedUser");
    //     log(selectedUser);
    // }, [selectedUser]);

    function handleInput(event) {
        let name = event.target.name;
        let value = event.target.value;

        let temp = { ...selectedUser };
        temp.doc = { ...selectedUser.doc };
        temp.doc[name] = value;

        setSelectedUser(temp);
    }

    async function createDoc() {
        const id = uuidv4();

        let userDoc = { ...selectedUser.doc };
        userDoc._id = id;

        try {
            var response = await db.put(userDoc);
            log(response);

            if (response.ok) {
                getAllDocs()
                    .then((data) => {
                        setUserList(data.rows);
                    })
                    .catch((err) => {
                        log(err);
                    });
            }
        } catch (err) {
            log(err);
        }
    }

    async function updateDoc() {
        let userDoc = { ...selectedUser.doc };

        try {
            var response = await db.put(userDoc);

            log(response);

            if (response.ok) {
                getAllDocs()
                    .then((data) => {
                        setUserList(data.rows);
                    })
                    .catch((err) => {
                        log(err);
                    });
            }
        } catch (err) {
            log(err);
        }
    }

    async function removeDoc() {
        let userDoc = { ...selectedUser.doc };
        try {
            var response = await db.remove(userDoc);
            log(response);
            if (response.ok) {
                getAllDocs()
                    .then((data) => {
                        setUserList(data.rows);
                    })
                    .catch((err) => {
                        log(err);
                    });
            }
        } catch (err) {
            log(err);
        }
    }

    async function getAllDocs() {
        try {
            var result = await db.allDocs({
                include_docs: true,
                attachments: true,
            });

            return result;
        } catch (err) {
            log(err);
            return [];
        }
    }

    return (
        <div className="row">
            <div className="col">
                <table className="table p-2">
                    <thead>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user) => {
                            return (
                                <tr
                                    onClick={() => setSelectedUser(user)}
                                    key={user.id}
                                >
                                    <th scope="row">{user.doc.username}</th>
                                    <td>{user.doc.password}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="col">
                <div className="p-2">
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            value={selectedUser.doc.username}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={selectedUser.doc.password}
                            onChange={handleInput}
                        />
                    </div>

                    <button
                        className="btn btn-primary me-2"
                        onClick={() => setSelectedUser(initialState)}
                    >
                        Add New
                    </button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={createDoc}
                    >
                        Create Doc
                    </button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={updateDoc}
                    >
                        Update Doc
                    </button>
                    <button
                        className="btn btn-primary me-2"
                        onClick={removeDoc}
                    >
                        Remove Doc
                    </button>
                </div>
            </div>
        </div>
    );
};

export default User;
