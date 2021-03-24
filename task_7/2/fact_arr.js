"use strict";

function factorial(num) {
    if (num === 1 || num === 0) return 1;
    return num * factorial(num - 1);
}

if (process.argv.length > 2) {
    let arr = JSON.parse(process.argv[2]);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 0) {
            arr[i] = undefined;
            continue;
        }
        arr[i] = factorial(parseInt(arr[i]));
    }
    console.log(arr);
}
