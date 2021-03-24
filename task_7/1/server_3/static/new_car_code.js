"use strict";

window.onload = function() {
    const car_name_in = document.getElementById("car_name");
    const cost_in = document.getElementById("cost");

    const btn = document.getElementById("new-car-send-btn");

    const label = document.getElementById("result-label");

    function ajaxPost(urlString, bodyString, callback) {
        let r = new XMLHttpRequest();
        r.open("POST", urlString, true);
        r.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        r.send(bodyString);
        r.onload = function() {
            callback(r.response);
        }
    }

    btn.onclick = function() {
        const car_name = car_name_in.value;
        const cost = cost_in.value;

        ajaxPost("/new_car", JSON.stringify({
            car_name, cost
        }), function(answerString) {
            const objectAnswer = JSON.parse(answerString);
            label.innerHTML = objectAnswer.answer;
        });
    };

    car_name_in.onkeydown = car_name_in.onkeypress = car_name_in.onkeyup = function () {
        label.innerHTML = "";
    }

    cost_in.onkeydown = cost_in.onkeypress = cost_in.onkeyup = function () {
        label.innerHTML = "";
    }

};