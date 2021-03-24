"use strict";

window.onload = function() {
    const storage_name_in = document.getElementById("storage_name");
    const cars_in = document.getElementById("cars");

    const btn = document.getElementById("new-storage-send-btn");

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
        const storage_name = storage_name_in.value;
        let cars = cars_in.value;
        cars = cars.split(' ');

        ajaxPost("/new_storage", JSON.stringify({
            storage_name, cars
        }), function(answerString) {
            const objectAnswer = JSON.parse(answerString);
            label.innerHTML = objectAnswer.answer;
        });
    };

    storage_name_in.onkeydown = storage_name_in.onkeypress = storage_name_in.onkeyup = function () {
        label.innerHTML = "";
    }

    cars_in.onkeydown = cars_in.onkeypress = cars_in.onkeyup = function () {
        label.innerHTML = "";
    }

};