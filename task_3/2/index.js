"use strict"

const fs = require("fs");

const vowels = "aeiouyаеёиоуыэюя";

function check(str) {
    let ch_num = str.split("").filter(char => vowels.includes(char)).length;
    if (ch_num === str.length) console.log(str);
}

if (!fs.existsSync("input.json")) return;
let jsonString = fs.readFileSync("input.json", "utf8");
let arr = JSON.parse(jsonString);
arr.forEach(str => check(str));