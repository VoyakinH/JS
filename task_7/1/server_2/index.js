"use strict";

// Импорт библиотеки.
const express = require("express");
const fs = require("fs");

// Запуск сервера, порт 5002
const app = express();
const port = 5002;
app.listen(port);
console.log("Server on port " + port);

// Заголовки для ответа.
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// Загрузка тела для post запросов
function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

// Приём запроса /insert/record
app.post("/insert/record", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        let result = false;
        let data = [];
        if (fs.existsSync("storage.txt")) {
            data = fs.readFileSync("storage.txt", "utf8");
            data = JSON.parse(data);
        }
        if (data.filter(item => item.storage_name === obj.storage_name).length === 0) {
            data.push(obj);
            data = JSON.stringify(data);
            fs.writeFileSync("storage.txt", data);
            result = true;
        }
        response.end(JSON.stringify({inserted: result}));
    });
});

// Приём запроса /select/record
app.post("/select/record", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        let result;
        let exist = false;
        if (fs.existsSync("storage.txt")) {
            let data = fs.readFileSync("storage.txt", "utf8");
            data = JSON.parse(data);
            result = data.filter(item => item.storage_name === obj.storage_name);
            if (result.length > 0) {
                result = result[0].cars;
                exist = true;
            }
        }
        response.end(JSON.stringify({founded: exist, cars: result}));
    });
});