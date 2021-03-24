"use strict";

// Импортируем библиотеки.
const express = require("express");
const cookieSession = require("cookie-session");
const fs = require("fs");

// Запускаем сервер.
const app = express();
const port = 5015;
app.listen(port);
console.log(`Server on port ${port}`);

// Активируем шаблонизатор.
app.set("view engine", "hbs");

// Работа с сессией.
app.use(cookieSession({
    name: 'session',
    keys: ['hhh', 'qqq', 'vvv'],
    maxAge: 24 * 60 * 60
}));

// Заголовки в ответ клиенту.
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const pageLogin = fs.readFileSync("pageLogin.html", "utf8");

function authorize(login, password) {
    const db = JSON.parse(fs.readFileSync("db.json", "utf8"));
    let num;
    let founded = false;
    for (num = 0; num < db.length; num++) {
        if (db[num].login === login && db[num].password === password) {
            founded = true;
            break;
        }
    }
    return(JSON.stringify({exist: founded, person: db[num]}));
}

// Удалить все cookie.
app.get("/api/delete", function(request, response) {
    request.session = null;
    response.end(pageLogin);
});

app.get("/login", function(request, response) {
    const login = request.query.login;
    const password = request.query.password;
    const obj = JSON.parse(authorize(login, password));
    if (obj.exist) {
        request.session.login = login;
        request.session.password = password;
        const personObj = {
            login: obj.person.login,
            hobby: obj.person.hobby,
            age: obj.person.age
        };
        response.render("pageLk.hbs", personObj);
    }
    else {
        response.end(pageLogin);
    }
});

app.get("/lk", function(request, response) {
    if (!request.session.login || !request.session.password) {
        response.end(pageLogin);
    }
    else {
        const login = request.session.login;
        const password = request.session.password;
        const obj = JSON.parse(authorize(login, password));
        if (obj.exist) {
            const personObj = {
                login: obj.person.login,
                hobby: obj.person.hobby,
                age: obj.person.age
            };
            response.render("pageLk.hbs", personObj);
        }
        else {
            response.end(pageLogin);
        }
    }
});