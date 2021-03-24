"use strict"

const fs = require("fs");
const rl = require("readline-sync");

const n = rl.question("Введите кол-во строк: ");
let arr = [];
for (let i = 0; i < parseInt(n); i++) {
    let str = rl.question('№' + (i + 1) + ': ');
    if (str.length % 2 === 0) arr.push(str);
}
let jsonString = JSON.stringify(arr);
fs.writeFileSync("result.json", jsonString);
console.log("Completed");