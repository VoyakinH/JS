"use strict";

// Импортируем необходимые библиотеки.
const express = require("express");
const fs = require("fs");

// Запускаем сервер.
const app = express();
const port = 5015;
app.listen(port);
console.log(`Server port: ${port}`);

// Отправка статических файлов.
const way = __dirname + "/static";
app.use(express.static(way));

// Заголовки в ответ клиенту.
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// Получение информации о человеке по его почте.
app.get("/info", function(request, response) {
    const email = request.query.email;
    if (fs.existsSync("file.txt")) {
        const jsonStr = fs.readFileSync("file.txt", "utf8");
        const arr = JSON.parse(jsonStr);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].email === email) {
                response.end(JSON.stringify({result: JSON.stringify(arr[i])}));
                return;
            }
        }
    }
    response.end(JSON.stringify({result: "EMAIL NOT FOUND"}));
});

function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

app.post("/reg", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const email = obj["email"];
        const phone = obj["phone"];
        let arr = [];
        if (fs.existsSync("file.txt")) {
            const jsonStr = fs.readFileSync("file.txt", "utf8");
            arr = JSON.parse(jsonStr);
            let unique = true;
            for (let i = 0; i < arr.length && unique; i++) {
                const element = arr[i];
                if (element.email === email || element.phone === phone) unique = false;
            }
            if (!unique) {
                response.end(JSON.stringify({
                    result: "NOT SAVED"
                }));
                return;
            }
        }
        arr.push(obj);
        fs.writeFileSync("file.txt", JSON.stringify(arr));
        response.end(JSON.stringify({
            result: "SAVED"
        }));
    });
});