"use strict";

window.onload = function() {
    const email_in = document.getElementById("email");

    const btn = document.getElementById("info-send-btn");

    const label = document.getElementById("result-label");

    function ajaxGet(urlString, callback) {
        let r = new XMLHttpRequest();
        r.open("GET", urlString, true);
        r.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        r.send(null);
        r.onload = function() {
            callback(r.response);
        };
    }

    btn.onclick = function() {
        const email = email_in.value;
        const url = `/info?email=${email}`;
        ajaxGet(url, function(stringAnswer) {
            const obj = JSON.parse(stringAnswer);
            label.innerHTML = obj.result;
        });
    };

    email_in.onkeydown = email_in.onkeypress = email_in.onkeyup = function () {
        label.innerHTML = "";
    }
};