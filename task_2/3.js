"use strict"

let x = 0;
let delay = 2000;

setTimeout(function tick() {
    x++;
    console.log(x);
    if (x === 20) {
        x = 0;
        delay = 2000;
    }
    if (x === 10) {
        delay = 1000;
    }
    setTimeout(tick, delay);
  }, 0);