"use strict"

const fs = require("fs");

function output(name, dir) {
    if (!fs.lstatSync(dir + '/' + name).isDirectory() && name.endsWith(".txt"))
    {
        let content = fs.readFileSync(dir + '/' + name, "utf8");
        if (content.length  <= 10) {
            console.log(name);
        }
    }
}

function in_dir(dir) {
    let arr = fs.readdirSync(dir);
    requr(arr, dir);
}

function requr(arr, dir) {
    if (arr.length === 0) return;
    let name = arr.pop();
    if (fs.lstatSync(dir + '/' + name).isDirectory()) {
        in_dir(dir + '/' + name);
    }
    requr(arr, dir);
    output(name, dir);
}

const dir = "/Users/Alex/Documents/NodeJS/TASK_3/4/Storage";
in_dir(dir);
