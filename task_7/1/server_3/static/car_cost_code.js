"use strict";

window.onload = function() {
    const car_name_in = document.getElementById("car_name");

    const btn = document.getElementById("car-cost-send-btn");

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
        ajaxPost("/car_cost", JSON.stringify({
            car_name
        }), function(answerString) {
            const objectAnswer = JSON.parse(answerString);
            label.innerHTML = objectAnswer.answer;
        });
    };

    car_name_in.onkeydown = car_name_in.onkeypress = car_name_in.onkeyup = function () {
        label.innerHTML = "";
    }
};