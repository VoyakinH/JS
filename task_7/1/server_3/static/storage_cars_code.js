"use strict";

window.onload = function() {
    const storage_name_in = document.getElementById("storage_name");

    const btn = document.getElementById("cars-info-send-btn");

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
        ajaxPost("/storage_cars", JSON.stringify({
            storage_name
        }), function(answerString) {
            const objectAnswer = JSON.parse(answerString);
            label.innerHTML = objectAnswer.answer;
        });
    };

    storage_name_in.onkeydown = storage_name_in.onkeypress = storage_name_in.onkeyup = function () {
        label.innerHTML = "";
    }
};