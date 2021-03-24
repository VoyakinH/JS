"use strict"

const fs = require("fs");

let jsonstr = fs.readFileSync("input.json", "utf8");
let obj = JSON.parse(jsonstr);
let max = 0;
let pk = undefined;

function req(obj, vloj) {
    for (let key in obj) {
        max = Math.max(max, vloj);
        let loc_max = max;
        req(obj[key], vloj + 1);
        if (vloj === 0 && loc_max < max) pk = key;
    }
}

req(obj, 0);
console.log(JSON.stringify(obj[pk]));