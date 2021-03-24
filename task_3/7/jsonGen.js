"use strict"

const fs = require("fs");

let obj = {
    a: {
        a1: 10,
        a2: {
            a21: 10,
            a22: 20
        },
        a3: true
    },
    b: {
        b1: -1.31,
        b2: true,
        b3: {
            b31: {
                b311: {
                    b3111: 91.31,
                    b3112: [-1, -2]
                }
            },
            b32: {
                b321: [10, 11, 12, 13],
                b322: false
            },
            b33: 0
        }
    },
    c: {
        c1: -1
    }
}

let jsonstr = JSON.stringify(obj);
fs.writeFileSync("input.json", jsonstr);