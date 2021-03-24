"use strict";

function factorial(num) {
    if (num === 1 || num === 0) return 1;
    return num * factorial(num - 1);
}

if (process.argv.length > 2) {
    const num = parseInt(process.argv[2]);
    if (num >= 0) console.log(factorial(num));
    else console.log(undefined);
}
