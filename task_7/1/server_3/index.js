"use strict";

// Импортируем библиотеки.
const express = require("express");
const request = require("request");

// Запуск сервера.
const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

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

function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

// Функция для отправки POST запросов на другие сервера.
function sendPost(url, body, callback) {
    // задаём заголовки
    const headers = {};
    headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    headers["Connection"] = "close";
    // отправляем запрос
    request.post({
        url: url,
        body: body,
        headers: headers,
    }, function (error, response, body) {
        if(error) {
            callback(null);
        } else {
            callback(body);
        }
    });
}

app.post("/new_car", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        sendPost("http://localhost:5001/insert/record", JSON.stringify({
            car_name: obj.car_name,
            cost: obj.cost
        }), function(ans_str) {
            const ans_obj = JSON.parse(ans_str);
            const inserted = ans_obj.inserted;
            if (inserted) {
                response.end(JSON.stringify({answer: "ЗАПИСЬ ДОБАВЛЕНА"}));
            }
            response.end(JSON.stringify({answer: "МАШИНА С ТАКИМ НАЗВАНИЕМ УЖЕ ДОБАВЛЕНА"}));
        });
    });
});

app.post("/car_cost", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        sendPost("http://localhost:5001/select/record", JSON.stringify({
            car_name: obj.car_name
        }), function(ans_str) {
            const ans_obj = JSON.parse(ans_str);
            const founded = ans_obj.founded;
            if (founded) {
                response.end(JSON.stringify({answer: `СТОИМОСТЬ: ${ans_obj.cost}`}));
            }
            response.end(JSON.stringify({answer: "МАШИНА НЕ НАЙДЕНА"}));
        });
    });
});

app.post("/new_storage", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        sendPost("http://localhost:5002/insert/record", JSON.stringify({
            storage_name: obj.storage_name,
            cars: obj.cars
        }), function(ans_str) {
            const ans_obj = JSON.parse(ans_str);
            const inserted = ans_obj.inserted;
            if (inserted) {
                response.end(JSON.stringify({answer: "ЗАПИСЬ ДОБАВЛЕНА"}));
            }
            response.end(JSON.stringify({answer: "СКЛАД С ТАКИМ НАЗВАНИЕМ УЖЕ ДОБАВЛЕН"}));
        });
    });
});

app.post("/storage_cars", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        sendPost("http://localhost:5002/select/record", JSON.stringify({
            storage_name: obj.storage_name,
        }), function(ans_str) {
            const ans_obj = JSON.parse(ans_str);
            const founded = ans_obj.founded;
            if (founded) {
                response.end(JSON.stringify({answer: `МАШИНЫ НА СКЛАДЕ: ${ans_obj.cars}`}));
            }
            response.end(JSON.stringify({answer: "СКЛАД НЕ НАЙДЕН"}));
        });
    });
});