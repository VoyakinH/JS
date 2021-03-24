"use strict";

window.onload = function() {
    const email_in = document.getElementById("email");
    const surname_in = document.getElementById("surname");
    const phone_in = document.getElementById("phone");

    const btn = document.getElementById("reg-send-btn");

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
        const email = email_in.value;
        const surname = surname_in.value;
        const phone = phone_in.value;

        ajaxPost("/reg", JSON.stringify({
            email, surname, phone
        }), function(answerString) {
            const objectAnswer = JSON.parse(answerString);
            label.innerHTML = objectAnswer.result;
        });
    };

    email_in.onkeydown = email_in.onkeypress = email_in.onkeyup = function () {
        label.innerHTML = "";
    }

    phone_in.onkeydown = phone_in.onkeypress = phone_in.onkeyup = function () {
        label.innerHTML = "";
    }

    surname_in.onkeydown = surname_in.onkeypress = surname_in.onkeyup = function () {
        label.innerHTML = "";
    }
};