"use strict"

const fs = require("fs");
const express = require("express");

const app = express();
const port = 5015;
app.listen(port);
console.log("Server port: ", port);

app.get("/form", function(request, response) {
    const nameString = request.query.p;
    if (fs.existsSync(nameString)) {
        const contentString = fs.readFileSync(nameString, "utf8");
        response.end(contentString);
    } else {
        const contentString = fs.readFileSync("bad.html", "utf8");
        response.end(contentString);
    }
});

app.get("/choose", function(request, response) {
    let answerJSON = undefined;
    let index = request.query.i;
    if(!fs.existsSync("input.json")) {
        answerJSON = JSON.stringify("Json file not found");
    }
    else {
        let contentJson = fs.readFileSync("input.json", "utf8");
        let content = JSON.parse(contentJson);
        if (index < 0 || index > content.length - 1) {
            answerJSON = JSON.stringify("Invalid index");
        }
        else {
            let res = content[index];
            answerJSON = JSON.stringify({result: res});
        }
    }
    response.end(answerJSON);
});