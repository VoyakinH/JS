"use strict"

const fs = require("fs");
const rl = require("readline-sync");

const n = rl.question("Введите кол-во файлов: ");
let res_str = "";

for (let i = 0; i < n; i++) {
    let name = rl.question('№' + (i + 1) + ': ');
    if (!fs.existsSync(name + ".txt")) {
        console.log("Файл " + name + ".txt не найден.");
        i--;
        continue;
    }
    let str = fs.readFileSync(name + ".txt", "utf8").replace(/\n/g, '');
    res_str += str;
}

fs.writeFileSync("result.txt", res_str);