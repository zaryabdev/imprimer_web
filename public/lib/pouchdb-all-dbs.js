/**
 * Minified by jsDelivr using Terser v5.3.5.
 * Original file: /npm/pouchdb-all-dbs@1.1.1/lib/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
"use strict";
var utils = require("./pouch-utils"),
    TaskQueue = require("./taskqueue"),
    PREFIX = "db_";
function prefixed(n) {
    return PREFIX + n;
}
function unprefixed(n) {
    return n.slice(PREFIX.length);
}
(module.exports = function (n) {
    var e,
        t,
        o = "pouch__all_dbs__",
        u = new TaskQueue();
    function r(n) {
        n && console.error(n);
    }
    function i() {
        u.add(function (t) {
            if (e) return t();
            (e = new n(o)), t();
        });
    }
    function c(n) {
        return n.replace(/^_pouch_/, "");
    }
    function f(n) {
        return (
            n === o || -1 !== n.indexOf("-mrview-") || /^https?:\/\//.test(n)
        );
    }
    n.on("created", function (n) {
        f((n = c(n))) ||
            ((n = prefixed(n)),
            i(),
            u.add(function (o) {
                e.get(n)
                    .then(function () {})
                    .catch(function (t) {
                        if ("not_found" !== t.name) throw t;
                        return e.put({ _id: n });
                    })
                    .then(function () {
                        t && (t[n] = !0), o();
                    }, o);
            }, r));
    }),
        n.on("destroyed", function (n) {
            f((n = c(n))) ||
                ((n = prefixed(n)),
                i(),
                u.add(function (o) {
                    e.get(n)
                        .then(function (n) {
                            return e.remove(n);
                        })
                        .catch(function (n) {
                            if ("not_found" !== n.name) throw n;
                        })
                        .then(function () {
                            t && delete t[n], o();
                        }, o);
                }, r));
        }),
        (n.allDbs = utils.toPromise(function (n) {
            i(),
                u.add(function (n) {
                    if (t) return n(null, Object.keys(t).map(unprefixed));
                    var o = { startkey: PREFIX, endkey: PREFIX + "￿" };
                    e.allDocs(o)
                        .then(function (e) {
                            t = {};
                            var o = [];
                            e.rows.forEach(function (n) {
                                o.push(unprefixed(n.key)), (t[n.key] = !0);
                            }),
                                n(null, o);
                        })
                        .catch(function (e) {
                            console.error(e), n(e);
                        });
                }, n);
        })),
        (n.resetAllDbs = utils.toPromise(function (n) {
            u.add(function (n) {
                e.destroy()
                    .then(function () {
                        (e = null), (t = null), n();
                    })
                    .catch(function (e) {
                        console.error(e), n(e);
                    });
            }, n);
        }));
}),
    "undefined" != typeof window &&
        window.PouchDB &&
        module.exports(window.PouchDB);
//# sourceMappingURL=/sm/f7a6f56f4b4ddb917ccacd16c73ef6e7f8610991ebf654339d110d17e73209d7.map
