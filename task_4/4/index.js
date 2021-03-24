"use strict";

const express = require("express");

const app = express();
const port = 5015;
app.listen(port);
console.log("Server port: ", port);

app.get("/make_arr", function(request, response) {
    const a = request.query.a;
    const b = request.query.b;
    const c = request.query.c;
    const aInt = parseInt(a);
    const bInt = parseInt(b);
    const cInt = parseInt(c);
    let arr = [];
    for (let i = aInt; i <= bInt; i++) {
        if (i % cInt === 0) {
            arr.push(i);
        }
    }
    const answerJSON = JSON.stringify({result: arr});
    response.end(answerJSON);
});
