"use strict";

const execSync = require('child_process').execSync;

let arr = []

// Получение параметров скрипта.
for (let i = 2; i < process.argv.length; i++) {
    arr.push(parseInt(process.argv[i]));
}

function cmd(str) {
    const options = {encoding: 'utf8'};
    const command = str.toString();
    const answer = execSync(command, options);
    return answer.toString();
}

let result = (cmd(`node fact_arr.js ${JSON.stringify(arr)}`));
console.log(result);