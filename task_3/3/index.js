"use strict"

const fs = require("fs");
const rl = require("readline-sync");

const ext = rl.question("Введите расширение файлов: ");
const dir = rl.question("Введите адрес папки: ");

let arr = fs.readdirSync(dir);

function check_ext(filename) {
    if (filename.endsWith(ext)) {
        console.log("\n----" + filename + "----");
        let content = fs.readFileSync(dir + '/' + filename, "utf8");
        console.log(content);
    }
}

arr.forEach(filename => check_ext(filename));