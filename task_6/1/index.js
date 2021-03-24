"use strict";

// Импорт библиотеки.
const express = require("express");
const fs = require("fs");

// Запускаем сервер.
const app = express();
const port = 5015;
app.listen(port);
console.log(`Server on port ${port}`);

// Активируем шаблонизатор.
app.set("view engine", "hbs");

// Заголовки в ответ клиенту.
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// Выдача страницы с массивом игр, подходящих под возраст.
app.get("/page/games", function(request, response) {
    const age = parseInt(request.query.age);
    const games = JSON.parse(fs.readFileSync("games.json", "utf8"));
    const filteredGames = games.filter(item => item.age < age);
    const infoObject = {
        descriptionValue: `GAMES LIST WITH AGE UNDER ${age}`,
        gamesArray: filteredGames
    };
    response.render("pageGames.hbs", infoObject);
});