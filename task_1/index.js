"use strict"

const fs = require("fs");
const rl = require("readline-sync");

if (!fs.existsSync(process.argv[2])) {
    console.log("File does not exist.");
    return;
}

let data = fs.readFileSync(process.argv[2], "utf8");
data = data.split('\n');

let input = undefined;
while (1) {
    input = rl.question(":");
    if (input === "exit") return;

    let command = input.split(' ')[0];
    let direction = input.split(' ')[1];
    if (command === "num") {
        if (direction === ">") {
            data.sort(function (a, b) {
                return parseInt(a.split(' ')[1]) - parseInt(b.split(' ')[1]);
            })
            console.log(data);

        } else if (direction === "<") {
            data.sort(function (a, b) {
                return parseInt(b.split(' ')[1]) - parseInt(a.split(' ')[1]);
            })
            console.log(data);

        } else {
            console.log("Unknown command.");
        }

    } else if (command === "word") {
        if (direction === ">") {
            data.sort(function (a, b) {
                return (a.split(' ')[0]).localeCompare(b.split(' ')[0]);
            })
            console.log(data);

        } else if (direction === "<") {
            data.sort(function (a, b) {
                return -(a.split(' ')[0]).localeCompare(b.split(' ')[0]);
            })
            console.log(data);

        } else {
            console.log("Unknown command.");
        }
    } else {
        console.log("Unknown command.");
    }
}





