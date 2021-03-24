"use strict";

const execSync = require('child_process').execSync;

// Получение параметров скрипта.
const val = process.argv[2];
if (!val) return;

function cmd(str) {
    const options = {encoding: 'utf8'};
    const command = str.toString();
    const answer = execSync(command, options);
    return answer.toString();
}

// Получение факториала числа
let result = cmd(`node fact_num.js ${val}`);
console.log(result);